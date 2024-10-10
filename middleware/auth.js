const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.auth = (req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    if(!token){
        return res.status(401).json({error:'No autorizado'})
    }

    try
    {
        jwt.verify(token, config.appKey,(err, user)=>{
            console.log('hola mundo: ' + err + user)
            if(err){
                console.log('hola mundo2: ' + err + user)
                return res.status(401).json({error: err})
            }
            
            req.user = user
        }) 

        console.log('hola mundo3: ' + err + user)

        next()
    }
    catch(err)
    {
        return res.status(401).json({error: err})
    }
}