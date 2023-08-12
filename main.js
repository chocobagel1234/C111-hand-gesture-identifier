prediction_1 = "";
prediction_2 = "";

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

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction_1;
    speak_data2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("gesture_result_1").innerHTML = results[0].label;
        document.getElementById("gesture_result_2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        //Emoji codes:&#128400;(hello/bye-bye!), &#128077;(thumbs up), &#128078;(thumbs down), &#128076;(amazing!), &#9996;(victory) and &#128072;(pointing)
        if(results[0].label == "Hello/Bye-Bye") {
            document.getElementById("emoji_1").innerHTML = "<b>&#128400;</b>";
        }
        if(results[0].label == "Amazing") {
            document.getElementById("emoji_1").innerHTML = "<b>&#128076;</b>";
        }
        if(results[0].label == "Victory") {
            document.getElementById("emoji_1").innerHTML = "<b>&#9996;</b>";
        }
        if(results[0].label == "Pointing(to something)") {
            document.getElementById("emoji_1").innerHTML = "<b>&#9757;</b>";
        }
        if(results[0].label == "Thumbs Up") {
            document.getElementById("emoji_1").innerHTML = "<b>&#128077;</b>";
        }
        if(results[0].label == "Thumbs Down") {
            document.getElementById("emoji_1").innerHTML = "<b>&#128076;</b>";
        }

        //line break - the following if() conditions are for results[1]
        if(results[1].label == "Hello/Bye-Bye") {
            document.getElementById("emoji_2").innerHTML = "<b>&#128400;</b>";
        }
        if(results[1].label == "Amazing") {
            document.getElementById("emoji_2").innerHTML = "<b>&#128076;</b>";
        }
        if(results[1].label == "Victory") {
            document.getElementById("emoji_2").innerHTML = "<b>&#9996;</b>";
        }
        if(results[1].label == "Pointing(to something)") {
            document.getElementById("emoji_2").innerHTML = "<b>&#9757;</b>";
        }
        if(results[1].label == "Thumbs Up") {
            document.getElementById("emoji_2").innerHTML = "<b>&#128077;</b>";
        }
        if(results[1].label == "Thumbs Down") {
            document.getElementById("emoji_2").innerHTML = "<b>&#128076;</b>";
        }
        
    }
}