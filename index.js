const express = require('express')

const myConfig = require('./config/app')

const router = require('./router')

const bodyParser = require('body-parser')

const cors = require('cors')

const app = express()

const http = require('http')

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

app.use((rq, res, next)=> {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

const port = myConfig.appPort

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
})