//  to define the socket
// npm i Peer to install peerJs
 const  Socket  = io('/')

const videoGrid = document.getElementById('video-grid')

let myVideoStream;
const myVideo = document.createElement('video')
// turn it to false when the project is succesfully builded 
myVideo.muted = true;

// define myPeer
//GET http://localhost:3001/peerjs/id?ts=16064630731310.9478529963693267 net::ERR_EMPTY_RESPONSE issue is fixed by:
//removing  the parameters from const myPeer = new Peer() , so by default it will use their own server to provide the id.
var myPeer=new Peer()


// navigator.mediaDevices-> to use media devices in ur browser
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)
  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  Socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})
// automatically generate id
myPeer.on('open',id=>{
  // console.log(id)
  // pass id from myPeer-open
  Socket.emit('join-room',ROOM_ID,id)
})

// we have called here
function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
 
}





function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}

