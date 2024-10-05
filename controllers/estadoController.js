const Estados = require('../models').Estados
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,usuario,color} = req.body

        const estados = await Estados.build({
            nombre:nombre,
            color:color,
            usuarioIngresa:usuario,
            estado:1
        }, { transaction: t });

        estados.save()

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
        const estados = await Estados.findAll({where:{estado:1}, attributes:['id','nombre','color']});

        return res.status(200).json(estados)
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

        const estados = await Estados.findOne({where:{id:id}, attributes:['nombre','color']});

        return res.status(200).json(estados)
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.update = async(req, res)=>{
    try 
    {
        const {id,nombre,color,usuario} = req.body

        const estados = await Estados.findOne({where:{id:id}});

        if(!estados)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await estados.update({nombre:nombre,color:color,usuarioModifica:usuario})

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
        const {id,usuario} = req.body

        const estados = await Estados.findOne({where:{id:id}});

        if(!estados)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await estados.update({estado:2,usuarioModifica:usuario})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}