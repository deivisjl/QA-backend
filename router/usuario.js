const router = require('express').Router()
const {create, list, search, update, eliminar} = require('../controllers/usuarioController')
const {validate} = require('../validators')
const { body } = require('express-validator')
const {rules: usuarioRules} = require('../validators/usuario/usuario')
const {auth} = require('../middleware/auth')

router.post('/create', [auth, usuarioRules, validate], create)
router.get('/list', [auth], list)
router.post('/search', [auth], search)
router.post('/update', [auth], update)
router.post('/delete', [auth], eliminar)

module.exports = router