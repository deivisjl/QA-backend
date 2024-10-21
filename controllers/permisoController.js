const Permisos = require('../models').Permisos
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.create = async(req,res) =>{

    const t = await sequelize.transaction();

    try
    {    
        const {nombre,ruta,orden,visible,usuario} = req.body

        const permiso = await Permisos.build({
            titulo:nombre,
            ruta:ruta,
            orden:orden,
            usuarioIngresa:usuario,
            visible:visible,
            estado:1
        }, { transaction: t });

        permiso.save()

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
        const permiso = await Permisos.findAll({where:{estado:1}, attributes:['id','titulo','ruta','visible','orden']});

        return res.status(200).json(permiso)
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

        const permiso = await Permisos.findOne({where:{id:id}, attributes:['titulo','ruta','orden','visible']});

        return res.status(200).json(permiso)
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.update = async(req, res)=>{
    try 
    {
        const {id,nombre,ruta,orden,visible,usuario} = req.body

        const permiso = await Permisos.findOne({where:{id:id}});

        if(!permiso)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await permiso.update({titulo:nombre,ruta:ruta,orden:orden,visible:visible,usuarioModifica:usuario})

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

        const permiso = await Permisos.findOne({where:{id:id}});

        if(!permiso)
        {
            return res.status(422).send({message:'No se encontró el registro'})
        }

        await permiso.update({estado:2,usuarioModifica:usuario})

        return res.status(200).json({message:"Registro eliminado correctamente"})
    }
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}