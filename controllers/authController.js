const Usuarios = require('../models').Usuarios
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.login = async(req, res) =>{

    const { correo, password } = req.body

    try
    {
        const secret = require('crypto').randomBytes(64).toString('hex')
        
        const user = await Usuarios.findOne({ where:{ correo } })

        if(!user) return res.status(404).send({message:'Credenciales inválidas'})
            console.log(password)

        if(!bcrypt.compareSync(password, user.password)) return res.status(401).send({message:'Credenciales inválidas'})

        const userWithToken = generateToken(user.get({raw:true}))

        return res.status(200).send(userWithToken)
    }
    catch(e)
    {
        return res.status(500).send({message:e.message})
    }
}

exports.register = async(req, res) =>{
    
    try {
        const user = await User.create(req.body)

        const userWithToken = generateToken(user.get({raw:true}))

        return res.status(200).send(userWithToken)

    } catch (error) {
        
    }
}

const generateToken = (user) =>{
    delete user.password
    delete user.estado
    delete user.token
    delete user.createdAt
    delete user.updatedAt

    const token = jwt.sign(user, config.appKey, {expiresIn: 86400})

    return {...{ user }, ...{ token }}
}