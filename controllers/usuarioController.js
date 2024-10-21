const Usuario = require('../models').Usuarios
const UsuarioRoles = require('../models').UsuarioRoles
const Roles = require('../models').Roles
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,correo,password,roles} = req.body

        const usuario = await Usuario.create({
            nombre:nombre,
            correo:correo,
            password: password,
            estado:1
        }, { transaction: t });

        usuario.save()

        roles.forEach(item => {
            const rol = UsuarioRoles.build({
                usuarioId:usuario.id,
                rolId:parseInt(item.id),
                estado:1,
            }, { transaction: t })

            rol.save()
        });

        await t.commit();

        return res.status(200).send({message:"Usuario creado correctamente"})
    }
    catch(e)
    {
        await t.rollback();

        return res.status(500).send({message:e.message})
    }
}

exports.list = async(req, res)=>{

    try 
    {
        const usuarios = await Usuario.findAll({
            where:{estado:1}, 
            include:[{
                model:UsuarioRoles,
                include:[{model:Roles,attributes:['nombre'],required:false}],
                attributes:['id'],required:false
            }],
            attributes:['id','nombre','correo','estado']}
        );

        return res.status(200).json(usuarios)
    } 
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.search = async(req, res)=>{
    try 
    {
        const {id} = req.body

        const usuario = await Usuario.findOne({where:{id:id}, attributes:['nombre']});

        return res.status(200).json(usuario)
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.update = async(req, res)=>{

    const t = await sequelize.transaction();

    try 
    {
        const {id,nombre,roles} = req.body

        const usuario = await Usuario.findOne({where:{id:id},attributes:['id','nombre']});

        if(!usuario)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        usuario.nombre = nombre
        usuario.save()

        await UsuarioRoles.destroy({
            where:{usuarioId:usuario.id}
        })

        roles.forEach(item => {
            const rol = UsuarioRoles.build({
                usuarioId:usuario.id,
                rolId:parseInt(item.id),
                estado:1
            }, { transaction: t })

            rol.save()
        });

        await t.commit();

        return res.status(200).json({message:"Registro actualizado correctamente"})
    }
    catch (e) 
    {
        await t.rollback();

        return res.status(500).send({message:e.message})
    }
}

exports.eliminar = async(req, res)=>{
    try 
    {
        const {id} = req.body

        const usuario = await Usuario.findOne({where:{id:id}});

        if(!usuario)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await usuario.update({estado:2})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}