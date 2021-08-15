// npm init -> to initialize nodeJs app
// npm i express->to build our api
// to define express (to build web apps)
const express=require('express')
const app=express()

// to create server
const server=require('http').Server(app)

// npm i uuid-> we need a unique id for every specific room 
const {v4:uuidv4}=require('uuid')

// what route will be
// resp.status(200):indicates that the REST API successfully carried out whatever action the client requested


// to define the view engine
app.set('view engine','ejs')

//tell the server where is our public folder
app.use(express.static('public'))


app.get('/',(req,res)=>{
//    redirect to uuidv4 fct->generate unique id automatically
res.redirect(`/${uuidv4()}`)
})


// create new url:
// room like a param
// roomIdParam
app.get('/:room',(req,res)=>{
     // render room.ejs
    res.render('room',{roomId:req.params.room})
})



// to run nodeJs server:npm i -g nodemon
// then -> nodemon server.js(in the terminal)
// localhost:3030 
server.listen(3040);
