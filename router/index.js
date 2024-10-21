const router = require('express').Router()

router.get('/home', (req, res) =>{
    return res.send("QA-App")
})

router.use('/', require('./auth'))
router.use('/usuarios', require('./usuario'))
router.use('/proyectos', require('./proyectos'))
router.use('/etapas', require('./etapas'))
router.use('/estados', require('./estados'))
router.use('/sistemas', require('./sistemas'))
router.use('/requerimiento', require('./requerimiento'))
router.use('/tareas', require('./tareas'))
router.use('/workspace', require('./workspace'))
router.use('/reportes', require('./reportes'))

router.use('/permisos', require('./permisos'))
router.use('/roles', require('./roles'))

module.exports = router