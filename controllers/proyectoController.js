const Proyectos = require('../models').Proyectos
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,usuario} = req.body

        const proyecto = await Proyectos.build({
            nombre:nombre,
            usuarioIngresa:usuario,
            estado:1
        }, { transaction: t });

        proyecto.save()

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
        const proyectos = await Proyectos.findAll({where:{estado:1}, attributes:['id','nombre']});

        return res.status(200).json(proyectos)
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

        const proyecto = await Proyectos.findOne({where:{id:id}, attributes:['nombre']});

        return res.status(200).json(proyecto)
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

        const proyecto = await Proyectos.findOne({where:{id:id}});

        if(!proyecto)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await proyecto.update({nombre:nombre,usuarioModifica:usuario})

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

        const proyecto = await Proyectos.findOne({where:{id:id}});

        if(!proyecto)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await proyecto.update({estado:2,usuarioModifica:usuario})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}