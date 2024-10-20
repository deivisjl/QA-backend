const Modulos = require('../models').Modulos
const Estados = require('../models').Estados
const Etapas = require('../models').Etapas
const Tareas = require('../models').Tareas
const Usuarios = require('../models').Usuarios
const ModuloEtapas = require('../models').ModuloEtapas
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

exports.listarRequerimientos = async(req, res)=>{

    try 
    {
        const modulos = await Modulos.findAll(
            {
                where:{estado:1},
                include:[
                    {
                        model:Estados,attributes:['nombre','color'],
                    },
                    {
                        model:Usuarios,attributes:['nombre'],
                    },
                ],
                attributes:['nombre']
            }
        );

        return res.status(200).json(modulos)
    } 
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}

exports.listarTareas = async(req, res)=>{

    try 
    {
        const tareas = await Tareas.findAll({
            include:[{
                model:ModuloEtapas,attributes:['id'],
                include:[{
                    model:Modulos,attributes:['nombre'],
                    include:[{
                        model:Usuarios,attributes:['nombre'],required:false
                    }],
                    required:false
                },
                {
                    model:Etapas,attributes:['nombre'],required:false
                }],
                required:false,
            },
            {
                model:Estados,attributes:['nombre','color'],required:false
            }],
            attributes:['nombre']
        })

        return res.status(200).json(tareas)
    } 
    catch (e) 
    {
        return res.status(500).send({message:e.message})
    }
}
