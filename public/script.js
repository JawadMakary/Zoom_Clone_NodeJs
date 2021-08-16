//  to define the socket
// npm i Peer to install peerJs
 const  Socket  = io('/')

const videoGrid = document.getElementById('video-grid')

let myVideoStream;
const myVideo = document.createElement('video')
// turn it to false when the project is succesfully builded 
myVideo.muted = false;

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
      // input value
    let text = $("input");
    // when press enter send message
    // the enter btn have the nb of 13 in the keyboard
    $('html').keydown(function (e) {
      if (e.which == 13 && text.val().length !== 0) {
        // socket.emit->send 
        //sending a msg from frontend
        Socket.emit('message', text.val());
        // console.log(text.val())

        text.val('')
      }
    });

  Socket.on("createMessage",(message)=>{
    // console.log(message)
    // append the messages to the unordered list
    $('ul').append(`<li class='message'>
    <b>user</b><br> ${message}
    </li>`)
    scrollToBottom()
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
// if there is so many msgs:create scrollbar so design won't break(+add overflow scroll)
const scrollToBottom=()=>{
  var chat_window=$(".main-chat-windows")
  chat_window.scrollTop(chat_window.prop("scrollHeight"))
}
// to mute our video
const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
}


const setMuteButton = () => {
  const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `
  document.querySelector('.main-mute-button').innerHTML = html;
}

const setUnmuteButton = () => {
  const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `
  document.querySelector('.main-mute-button').innerHTML = html;
}