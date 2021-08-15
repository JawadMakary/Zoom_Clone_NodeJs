// npm init -> to initialize nodeJs app
// npm i express->to build our api
// to define express (to build web apps)
const express=require('express')
const app=express()

// to create server
const server=require('http').Server(app)
// what route will be
// resp.status(200):indicates that the REST API successfully carried out whatever action the client requested


// to define the view engine
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    // render room.ejs
res.render('room')
})

// to run nodeJs server:npm i -g nodemon
// then -> nodemon server.js(in the terminal)
// localhost:3030 
server.listen(3030);
