const router = require('express').Router()
const {listarRequerimientos, listarTareas, } = require('../controllers/reporteController')
const { body } = require('express-validator')
const {auth} = require('../middleware/auth')

router.get('/listarRequerimientos', [auth], listarRequerimientos)
router.get('/listarTareas', [auth], listarTareas)

module.exports = router