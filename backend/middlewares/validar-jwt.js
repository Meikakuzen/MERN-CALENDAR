import jwt from 'jsonwebtoken'

export const validarJWT = (req, res , next)=>{

    const token = req.header('x-token')


    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la validación'
        })

    }
    try {
        const {uid, nombre}= jwt.verify(token, process.env.SECRET_KEY)

        req.uid= uid
        req.nombre= nombre

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msg: "Token no válido"
        })
    }
    
    next()

}