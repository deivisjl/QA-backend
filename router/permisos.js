const router = require('express').Router()
const {create, list, search, update, eliminar} = require('../controllers/permisoController')
const { body } = require('express-validator')
const {auth} = require('../middleware/auth')

router.post('/create', [auth], create)
router.get('/list', [auth], list)
router.post('/search', [auth], search)
router.post('/update', [auth], update)
router.post('/delete', [auth], eliminar)

module.exports = router