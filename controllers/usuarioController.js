const Usuario = require('../models').Usuarios
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,correo,password} = req.body

        const usuario = await Usuario.build({
            nombre:nombre,
            correo:correo,
            password: password,
            estado:1
        }, { transaction: t });

        usuario.save()

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
        const usuarios = await Usuario.findAll({where:{estado:1}, attributes:['id','nombre','correo','estado']});

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
    try 
    {
        const {id,nombre} = req.body

        const usuario = await Usuario.findOne({where:{id:id}});

        if(!usuario)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await usuario.update({nombre:nombre})

        return res.status(200).json({message:"Registro actualizado correctamente"})
    }
    catch (e) 
    {
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