const Proyectos = require('../models').Proyectos
const Sistemas = require('../models').Sistemas
const Modulos = require('../models').Modulos
const ModuloEtapas = require('../models').ModuloEtapas
const Etapas = require('../models').Etapas
const Tareas = require('../models').Tareas
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
                        attributes:['id','nombre'], 
                        include:[{
                            model:ModuloEtapas, where:{estado:1},attributes:['id'], required: false
                        },{
                            model:Usuarios, attributes:['id','nombre'], required: false
                        },],
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
        const detalles = await ModuloEtapas.findAll({
            where:{id:{[Op.in]:[1,2]}},
            include:[{
                model:Etapas, where:{estado:1},attributes:['id','nombre']
            },{
                model:Tareas, where:{estadoId:1},attributes:['id','nombre'], required:false
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