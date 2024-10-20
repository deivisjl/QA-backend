const Sistemas = require('../models').Sistemas
const Proyectos = require('../models').Proyectos
const Usuario = require('../models').Usuarios
const Etapas = require('../models').Etapas
const Modulos = require('../models').Modulos
const ModulosEtapas = require('../models').ModuloEtapas
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.etapas = async(req, res)=>{

    try 
    {
        const etapas = await Etapas.findAll({where:{estado:1}, attributes:['id','nombre']});

        return res.status(200).json(etapas)
    } 
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.usuarios = async(req, res)=>{

    try 
    {
        const usuarios = await Usuario.findAll({where:{estado:1}, attributes:['id','nombre']});

        return res.status(200).json(usuarios)
    } 
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.detail = async(req, res) => {
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

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,asignado,sistema,etapas,usuario, estadoId} = req.body

        const requerimiento = await Modulos.create({
            nombre:nombre,
            usuarioId:asignado,
            usuarioIngresa:usuario,
            sistemaId:sistema,
            estadoId:estadoId,
            estado:1
        }, { transaction: t });

        requerimiento.save()

        if(etapas.length < 1)
        {
            throw ('Debe seleccionar al menos una etapa')
        }

        etapas.forEach(item => {
            const etapa = ModulosEtapas.build({
                moduloId:requerimiento.id,
                etapaId:parseInt(item.id),
                estado:1,
                usuarioIngresa:usuario
            }, { transaction: t })

            etapa.save()
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
        const {id} = req.body

        const modulos = await Modulos.findAll({
            where:{estado:1,sistemaId:id}, 
            include:{model:Usuario,attributes:['nombre']},
            attributes:['id','nombre']  
            });

        return res.status(200).json(modulos)
    } 
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.search = async(req, res)=>{
    try 
    {
        const {id, requerimiento} = req.body

        const modulo = await Modulos.findOne({
            where:{id:requerimiento,sistemaId:id},
            include:{model:ModulosEtapas,attributes:['etapaId']},
            attributes:['nombre','usuarioId','estadoId']
        });

        return res.status(200).json(modulo)
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.getEstado = async(req, res)=>{
    try 
    {
        const { id } = req.body

        const modulo = await Modulos.findOne({
            where:{id:id},            
            attributes:['estadoId']
        });

        return res.status(200).json(modulo)
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.setEstado = async(req, res)=>{
    try 
    {
        const {id,estado,usuario} = req.body
        
        const modulo = await Modulos.findOne({
            where:{id:id},
            attributes:['id','estadoId','usuarioModifica']
        });

        if(!modulo)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await modulo.update({estadoId:estado,usuarioModifica:usuario})

        return res.status(200).json({message:"Registro actualizado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.update = async(req, res)=>{
    try 
    {
        const {id,nombre,estado,usuario,usuarioId} = req.body
        
        const modulo = await Modulos.findOne({
            where:{id:id},
            attributes:['id','nombre','usuarioId','estadoId','usuarioModifica']
        });

        if(!modulo)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await modulo.update({nombre:nombre,estadoId:estado,usuarioId:usuarioId,usuarioModifica:usuario})

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

        const modulo = await Modulos.findOne({where:{id:id}});

        if(!modulo)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await modulo.update({estado:2,usuarioModifica:usuario})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}