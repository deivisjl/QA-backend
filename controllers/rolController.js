const Permisos = require('../models').Permisos
const Roles = require('../models').Roles
const PermisoRoles = require('../models').PermisoRoles
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,permisos,usuario} = req.body

        const rol = await Roles.create({
            nombre:nombre,
            estado:1
        }, { transaction: t });

        rol.save()

        permisos.forEach(item => {
            const permiso = PermisoRoles.build({
                rolId:rol.id,
                permisoId:parseInt(item.id),
            }, { transaction: t })

            permiso.save()
        });

        await t.commit();

        return res.status(200).send({message:"Registro creado correctamente"})
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
        const roles = await Roles.findAll({where:{estado:1}, attributes:['id','nombre']});

        return res.status(200).json(roles)
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

        const roles = await Roles.findOne({where:{id:id}, attributes:['nombre']});

        return res.status(200).json(roles)
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
        const {id,nombre,permisos,usuario} = req.body

        const rol = await Roles.findOne({where:{id:id},attributes:['id','nombre']})
        
        rol.nombre = nombre

        rol.save()

        await PermisoRoles.destroy({
            where:{rolId:id}
        })

        permisos.forEach(item => {
            const permiso = PermisoRoles.build({
                rolId:rol.id,
                permisoId:parseInt(item.id),
            }, { transaction: t })

            permiso.save()
        });

        await t.commit();

        return res.status(200).send({message:"Registro creado correctamente"})
    }
    catch(e)
    {
        await t.rollback();

        return res.status(500).send({message:e.message})
    }
}

exports.eliminar = async(req, res)=>{
    try 
    {
        const {id,usuario} = req.body

        const rol = await Roles.findOne({where:{id:id}});

        if(!rol)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await rol.update({estado:2})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}