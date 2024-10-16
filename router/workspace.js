const router = require('express').Router()
const {list, detalleModulo} = require('../controllers/workspaceController')
const { body } = require('express-validator')
const {rules: usuarioRules} = require('../validators/usuario/usuario')
const {auth} = require('../middleware/auth')

router.get('/list', [auth], list)
router.post('/detalle-modulo', [auth], detalleModulo)

module.exports = router