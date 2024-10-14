const Proyectos = require('../models').Proyectos
const Sistemas = require('../models').Sistemas
const Modulos = require('../models').Modulos
const ModuloEtapas = require('../models').ModuloEtapas
const bcrypt = require('bcrypt')
const {sequelize} = require('../models')

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
                        include:[{model:ModuloEtapas, where:{estado:1},attributes:['id'], required: false}],
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