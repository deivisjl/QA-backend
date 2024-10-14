const router = require('express').Router()
const {list} = require('../controllers/workspaceController')
const { body } = require('express-validator')
const {rules: usuarioRules} = require('../validators/usuario/usuario')
const {auth} = require('../middleware/auth')

router.get('/list', [auth], list)

module.exports = router