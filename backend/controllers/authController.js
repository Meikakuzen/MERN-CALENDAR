import { validationResult } from "express-validator"
import Usuario from "../models/Usuario.js"
import bcrypt from 'bcryptjs'
import generarJWT from '../helpers/jwt.js'

export const crearUsuario= async (req,res)=>{
    const {nombre, email, password}= req.body

    const usuarioExiste = await Usuario.findOne({email})

    if (usuarioExiste){
        return res.status(400).json({
            msg: "El usuario ya existe"
        })
    }

   try {
       const usuario = new Usuario(req.body)
    
       const salt = bcrypt.genSaltSync(10);
       usuario.password= bcrypt.hashSync(password, salt)
       await usuario.save()
       
       const token= await generarJWT(usuario.id, usuario.nombre)

    res.status(200).json({
       ok: true,
       uid: usuario.id,
       nombre: usuario.nombre,
       token

    })
    
   } catch (error) {
   
    res.status(500).json({
        ok: false,
        msg: 'Por favor, hable con el administrador'
    })
   }

}

export const login = async(req,res)=>{

    const {email, password} = req.body

    const usuario = await Usuario.findOne({email})
    
    try {
        if(!usuario){
            return res.status(400).json({
                msg: "El usuario no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: "Algo ha fallado en la autenticación"
        })
    }

    const validPassword= bcrypt.compareSync(password,  usuario.password)

    try {
        if(!validPassword){
            return res.status(400).json({
                msg: "Password incorrecto"
            })
        }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "Por favor, hable con el administrador : )"
      })  
    }

    const token= await generarJWT(usuario.id, usuario.nombre)


    res.json({
        ok: true,
        uid: usuario.id,
        nombre: usuario.nombre,
        token
    })
}

export const renovarToken = async(req,res)=>{
   
   const {uid, nombre}= req

   const token= await generarJWT(uid, nombre)
   
   
    res.json({
        ok: true,
        token
    })
}