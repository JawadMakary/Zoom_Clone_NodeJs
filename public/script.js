const videoGrid = document.getElementById('video-grid')

let myVideoStream;
const myVideo = document.createElement('video')
myVideo.muted = true;
// navigator.mediaDevices-> to use media devices in ur browser
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  myVideoStream = stream;
  addVideoStream(myVideo, stream)
  
  })

  
 

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}


