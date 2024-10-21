const Usuarios = require('../models').Usuarios
const UsuarioRoles = require('../models').UsuarioRoles
const PermisoRoles = require('../models').PermisoRoles
const Permisos = require('../models').Permisos
const Roles = require('../models').Roles
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

        if(!bcrypt.compareSync(password, user.password)) return res.status(401).send({message:'Credenciales inválidas'})

        const userWithToken = generateToken(user.get({raw:true}),user.id)

        const permisos = await UsuarioRoles.findAll({
            where:{usuarioId:user.id},
            include:[{model:Roles,
                        include:[{model:PermisoRoles,
                                    include:[{model:Permisos,attributes:['id','titulo','ruta','orden'],order:[['orden','asc']],required:false}],
                                    attributes:['id'],required:false}],
                        attributes:['id'],
                        required:false}],
            attributes:['id']
        })

        var m = []

        permisos.map((item)=>{
            item.Role.PermisoRoles.map((menu)=> {
                m.push({id:menu.Permiso.id,ruta:menu.Permiso.ruta,titulo:menu.Permiso.titulo})
            })
        })

        const temp = m.filter((obj1, i, arr) => 
            arr.findIndex(obj2 => 
              JSON.stringify(obj2) === JSON.stringify(obj1)
            ) === i
        )

        return res.status(200).send({...userWithToken,...{permisos:temp}})
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

const generateToken = (user,id) =>{
    delete user.password
    delete user.estado
    delete user.token
    delete user.createdAt
    delete user.updatedAt

    const token = jwt.sign(user, config.appKey, {expiresIn: 86400})

    return {...{ user }, ...{ token }}
}