const {body} = require('express-validator')

exports.rules = (() =>{
    return [
        body('nombre').notEmpty(),
        body('correo').notEmpty(),
        body('password').isLength({ min: 5})
    ]
})()