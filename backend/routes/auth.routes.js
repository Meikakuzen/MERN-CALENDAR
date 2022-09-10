import {Router} from 'express'
import {crearUsuario, login, renovarToken} from '../controllers/authController.js'
import {body} from 'express-validator'
import {validarCampos} from '../middlewares/validar-campos.js'
import { validarJWT } from '../middlewares/validar-jwt.js'


const router = Router()


router.post('/new',[
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', "El email es obligatorio").isEmail(),
    body('password', "El password debe de ser de al menos 6 caracteres").isLength({min:6}),
    validarCampos], crearUsuario)

router.post('/',[
    body('email', 'El email es obligatorio').isEmail(),
    body('password', "El password debe contener al menos 6 dígitos").isLength({min: 6}),
    validarCampos
], login)

router.get('/renew', validarJWT, renovarToken)


export default router