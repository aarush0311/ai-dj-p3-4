song="";
leftWristx=0;
leftWristy=0;
RightWristx=0;
RightWristy=0;
scoreLeftWrist=0;
function preload(){
    song=loadSound("Belever.mp3");
}
function setup(){
   canvas=createCanvas(600,500);
   canvas.center();
   video=createCapture(VIDEO);
   video.hide();
   poseNet=ml5.poseNet(video,modelLoaded);
   poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialized");
}
function draw(){
image(video,0,0,600,500);
fill("#0000FF");
stroke("#0000FF");
if(scoreLeftWrist>0.2){  
circle(leftWristx,leftWristy,20);
Number_leftWristy=Number(leftWristy);
removeDecimal=floor(Number_leftWristy);
volume=removeDecimal/500;
document.getElementById("volume").innerHTML="volume="+volume;
song.setVolume(volume);
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx="+leftWristx+" ,leftWristy="+leftWristy);
        RightWristx=results[0].pose.rightWrist.x;
        RightWristy=results[0].pose.rightWrist.y;
        console.log("RightWristx="+RightWristx+" ,RightWristy="+RightWristy);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist="+scoreLeftWrist);

    }
}
