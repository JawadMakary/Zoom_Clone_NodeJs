// npm init -> to initialize nodeJs app
// npm i express->to build our api

// to define express (to build web apps)
const express=require('express')
const app=express()
// to create server
const server=require('http').Server(app)
// to define peer and let express and peer work together

const {ExpressPeerServer}=require('peer')
const peerServer=ExpressPeerServer(server,{
    debug:true
})


// npm i uuid-> we need a unique id for every specific room 
const {v4:uuidv4}=require('uuid')

// npm i socket.io-> to install socket.io
//  to define it:
const io = require('socket.io')(server)
// on user connection
io.on('connection',(Socket)=>{
    Socket.on('join-room',(roomId,userId)=>{
        // console.log("room joined")
        
        Socket.join(roomId)
        // broadcast the user connected! (tell everyone that the user is connected )
        Socket.broadcast.to(roomId).emit('user-connected',userId);
        // listen and receive msg
        Socket.on('message',(message)=>{
            //send to the frontEnd(same room)
            io.to(roomId).emit('createMessage',message)
        })


        
    })
})
// what route will be
// resp.status(200):indicates that the REST API successfully carried out whatever action the client requested


// to define the view engine
app.set('view engine','ejs')

//tell the server where is our public folder
app.use(express.static('public'))
// what the url that peerjs will use
app.use('/peerjs',peerServer)

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
server.listen(3030);

//Overall HTTP allowed to complete about 10 requests per second while Socket.io could handle almost 4000 requests in the same time.
