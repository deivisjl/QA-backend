const router = require('express').Router()
const {create, list, search, update, eliminar, detail, usuarios, etapas} = require('../controllers/requerimientoController')
const { body } = require('express-validator')
const {auth} = require('../middleware/auth')

router.post('/create', [auth], create)
router.post('/list', [auth], list)
router.get('/usuarios', [auth], usuarios)
router.get('/etapas', [auth], etapas)
router.post('/search', [auth], search)
router.post('/detail', [auth], detail)
router.post('/update', [auth], update)
router.post('/delete', [auth], eliminar)

module.exports = router