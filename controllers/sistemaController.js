const Sistemas = require('../models').Sistemas
const Proyectos = require('../models').Proyectos
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,usuario} = req.body

        const sistema = await Sistemas.build({
            nombre:nombre,
            usuarioIngresa:usuario,
            estado:1
        }, { transaction: t });

        sistema.save()

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
        const sistemas = await Sistemas.findAll({
            where:{estado:1}, 
            include:{model:Proyectos,attributes:['nombre']},
            attributes:['id','nombre']
            });

        return res.status(200).json(sistemas)
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

        const sistema = await Sistemas.findOne({where:{id:id}, attributes:['nombre']});

        return res.status(200).json(sistema)
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.update = async(req, res)=>{
    try 
    {
        const {id,nombre,usuario} = req.body

        const sistema = await Sistemas.findOne({where:{id:id}});

        if(!sistema)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await sistema.update({nombre:nombre,usuarioModifica:usuario})

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

        const sistema = await Sistemas.findOne({where:{id:id}});

        if(!sistema)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await sistema.update({estado:2,usuarioModifica:usuario})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}