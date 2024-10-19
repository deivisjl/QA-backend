const Tareas = require('../models').Tareas
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.search = async(req, res)=>{
    try 
    {
        const {id} = req.body

        const tarea = await Tareas.findOne({where:{id:id}, attributes:['nombre','estadoId']});

        return res.status(200).json(tarea)
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.update = async(req, res)=>{
    try 
    {
        const {id,nombre,estado,usuario} = req.body
        console.log("Tareas...")

        const tarea = await Tareas.findOne({where:{id:id}, attributes:['id','nombre','estadoId','usuarioModifica']});

        if(!tarea)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await tarea.update({nombre:nombre,estadoId:estado,usuarioModifica:usuario})

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

        const tarea = await Tareas.findOne({where:{id:id}});

        if(!tarea)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await tarea.update({estado:2,usuarioModifica:usuario})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}