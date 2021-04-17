status="";
word="";
objects=[];
function setup(){
    canvas=createCanvas(640,480);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,480);
    video.hide();
}
function start(){
    object_identifier=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Loading Cocossd Model";
    word=document.getElementById("object_name").value;
}
function modelLoaded(){
    console.log("Model is Loaded");
    status=true;
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(video,0,0,640,480);
    if(status!=""){
        object_identifier.detect(video,gotResult);
        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Detected Objects";
            document.getElementById("object_status").innerHTML="Number of Objects Detected "+objects.length;
            percent=floor(objects[i].confidence*100);
            g=random(255);
            b=random(255);
            fill(0,g,b);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(0,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==word){
                document.getElementById("f").innerHTML = word + " Found";
                video.stop();
                objectDetector.detect(gotResult);
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(word + "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("f").innerHTML = word + " Not Found";
            }
        }
    }
}