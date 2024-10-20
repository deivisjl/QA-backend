const Proyectos = require('../models').Proyectos
const Sistemas = require('../models').Sistemas
const Modulos = require('../models').Modulos
const ModuloEtapas = require('../models').ModuloEtapas
const Tareas = require('../models').Tareas
const Etapas = require('../models').Etapas
const Estados = require('../models').Estados
const Usuarios = require('../models').Usuarios
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')
const { Op } = require("sequelize");

exports.list = async(req, res)=>{

    try 
    {
        const proyectos = await Proyectos.findAll({
            where:{estado:1}, 
                include:[
                    {model:Sistemas,where:{estado:1},attributes:['id','nombre'],
                    include:[
                        {model:Modulos, where:{estado:1},
                        attributes:['id','nombre','estadoId'], 
                        include:[{
                            model:ModuloEtapas, where:{estado:1},attributes:['id'], required: false
                        },{
                            model:Usuarios, attributes:['id','nombre'], required: false
                        },{
                            model:Estados, attributes:['nombre','color'], required: false
                        }],
                        required: false}
                    ], required: false },
                ],
            attributes:['id','nombre']});

        return res.status(200).json(proyectos)
    } 
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.detalleModulo = async(req,res) => {
    try
    {
        const {data} = req.body
        
        var info =  [];

        data.forEach(item => {
            info.push(item.id)            
        });

        const detalles = await ModuloEtapas.findAll({
            where:{id:{[Op.in]:info}},
            include:[{
                model:Etapas, where:{estado:1},attributes:['id','nombre']
            },{
                model:Tareas,attributes:['id','nombre'], 
                include:[{model:Estados,attributes:['nombre','color']}], required:false
            }],
            attributes:['id']
        })

        return res.status(200).json(detalles)
    }
    catch(e)
    {
        return res.status(500).send({message:e.message})
    }
}

exports.guardarTarea = async(req, res) => {
    
    const t = await sequelize.transaction();

    try
    {
        const {nombre,estado, moduloEtapa, usuario} = req.body

        const tarea = await Tareas.create({
            nombre:nombre,
            estadoId:estado,
            moduloEtapaId:moduloEtapa,
            usuarioIngresa:usuario,
            estado:1
        }, { transaction: t });

        tarea.save()

        await t.commit();

        return res.status(200).send({message:"Tarea agregada correctamente"})
    }
    catch(e)
    {
        await t.rollback();

        return res.status(500).send({message:e.message})
    }
}