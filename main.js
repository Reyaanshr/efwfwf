song1 = "";
sonng2 = "";
leftx = "";
rightx = "";
lefty = "";
righty = "";
scoreLeftWrist = 0;
song1_status= "";
song2_status = "";
scoreRightWrist = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(350,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose", gotPoses);

}

function draw(){
    image(video , 0 , 0 ,350 , 350);
    fill("#FF0000");
    stroke("#FF0000");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if (scoreLeftWrist > 0.2){
        circle(leftx , lefty);
        song2.stop();

    }

    if(song1_status = "false"){
        song1.play();
        document.getElementById("song").innerHtml = "Song 1 is playing";
    }

    if (scoreLeftWrist > 0.2){
        circle(rightx , righty);
        song1.stop();

    }

    if(song2_status = "false"){
        song2.play();
        document.getElementById("song").innerHtml = "Song 2 is playing";
    }

}

function modelLoaded(){
    console.log("PoseNet is on");
}

function gotPoses(results){
    if(results.length > 0){
        leftx = results[0].leftWrist.pose.x
        lefty = results[0].leftWrist.pose.y
        rightx = results[0].rightWrist.pose.x
        righty = results[0].rightWrist.pose.y
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

    }
}
