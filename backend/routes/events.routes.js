import {Router} from 'express'
import { getEventos, getEvento, crearEvento, borrarEvento, editarEvento } from '../controllers/eventsController.js'
import {validarJWT} from '../middlewares/validar-jwt.js'
import {body} from 'express-validator'
import {validarCampos} from '../middlewares/validar-campos.js'
import { isDate } from '../helpers/isDate.js'


const router = Router()

router.use(validarJWT)

router.get('/', getEventos)

router.get('/:id',  getEvento)

router.post('/', [body('title', 'El título es obligatorio').not().isEmpty(),
                 body('start', 'Fecha de inicio es obligatoria').custom(isDate), 
                 body('end', 'La fecha de finalización es obligatoria').custom(isDate), validarCampos], crearEvento)

router.put('/:id', editarEvento)

router.delete('/:id',borrarEvento)


export default router