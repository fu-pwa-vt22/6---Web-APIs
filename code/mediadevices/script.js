const video =           document.querySelector('video');
const canvas =          document.querySelector('canvas');
const ctx =             canvas.getContext('2d');
const image =           document.querySelector('img');
const captureBtn =      document.querySelector('button.capture-image');
const startStreamBtn =  document.querySelector('button.start-stream');
const stopStreamBtn =   document.querySelector('button.stop-stream');
let mediaStream;
let images = [];

function startStream(){

    if(navigator.mediaDevices){

        navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
            mediaStream = stream;
            video.srcObject = stream;
        })
        .catch(err => console.error(err))

    } else {
        console.log('No mediadevices found.')
    }
}

function captureImage(){
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let data = canvas.toDataURL('image/png');
    images.push({
        id: images.length + 1,
        imgData: data
    })
    localStorage.setItem('camApp', JSON.stringify({ images: images }))
    return data;
}

function printImage(imgData){

    image.setAttribute('src', imgData)

}

startStreamBtn.addEventListener('click', () => {
    startStream();
})

captureBtn.addEventListener('click', () => {

    let image = captureImage();
    printImage(image);  

})

stopStreamBtn.addEventListener('click', () => {

    mediaStream.getTracks().forEach(track => track.stop());

})