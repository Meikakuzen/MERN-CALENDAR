import Evento from "../models/Evento.js"


export const getEventos = async (req,res)=>{

    const eventos = await Evento.find()
                                .populate('user','nombre')


    res.json({
        eventos
    })
}

export const getEvento = (req,res)=>{
    res.json({
        msg: "Obtener evento ok"
    })
}

export const crearEvento = async(req, res)=>{


    const evento = new Evento(req.body)

    try {
        evento.user= req.uid
        await evento.save()
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha habido un problema creando el evento'
        })
    }
    res.json({
        ok: true,
        msg: "Evento creado correctamente"
    })
}


export const editarEvento= async (req, res)=>{

    const {id}= req.params
    const uid = req.uid
    
    try {
        const evento = await Evento.findById(id)

        if(!evento){
            return res.status(404).json({
                msg: "El evento no existe"
            })
        }
        if(evento.user.toString() !== uid){
            return res.status(401).json({
                msg: "No está autorizada/o para hacer esta acción"
            })
        }
        const nuevoEvento={
            ...req.body,
            user: uid,
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {new: true}); //true es opcional, para que devuelva el evento actualizado
        
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Algo ha ido mal editando el evento"
        })
    }

    res.json({
        ok: true,
        msg: "Evento actualizado correctamente"
    })
}

export const borrarEvento = async (req, res)=>{

const {id} = req.params
const evento = await Evento.findById(id)
const uid = req.uid


try {
    if(!evento){
        return res.status(404).json({
            msg: "El evento no existe"
        })
    }

    if(evento.user.toString() !== uid ){
        return res.status(401).json({
            msg: "No está autorizado/a para realizar esta acción"
        })
    }

    await Evento.findByIdAndDelete(id)
    
} catch (error) {
    console.log(error)
    return res.status(500).json({
        msg: "Algo ha dio mal en la eliminación del evento"
    })
}


    res.json({
        ok: true,
        msg: "Evento borrado correctamente"
    })
}