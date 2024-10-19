const router = require('express').Router()
const {search, update, eliminar} = require('../controllers/tareaController')
const { body } = require('express-validator')
const {auth} = require('../middleware/auth')

router.post('/search', [auth], search)
router.post('/update', [auth], update)
router.post('/delete', [auth], eliminar)

module.exports = router