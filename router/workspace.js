const router = require('express').Router()
const {list, detalleModulo, guardarTarea} = require('../controllers/workspaceController')
const { body } = require('express-validator')
const {rules: usuarioRules} = require('../validators/usuario/usuario')
const {auth} = require('../middleware/auth')

router.get('/list', [auth], list)
router.post('/detalle-modulo', [auth], detalleModulo)
router.post('/agregar-tarea',[auth], guardarTarea)

module.exports = router