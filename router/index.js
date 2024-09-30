const router = require('express').Router()

router.get('/home', (req, res) =>{
    return res.send("QA-App")
})

router.use('/', require('./auth'))
router.use('/usuarios', require('./usuario'))
router.use('/proyectos', require('./proyectos'))
router.use('/etapas', require('./etapas'))
router.use('/sistemas', require('./sistemas'))

module.exports = router