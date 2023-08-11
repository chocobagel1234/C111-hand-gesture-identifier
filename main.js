Webcam.set({
    width:500,
    height:380,
    image_format : 'png',
    png_quality:100
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("snapshot").innerHTML = "<img id='captured_image' src='"+data_uri+"'/>";
    });
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jhgqiunFq/model.json",modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!")
}