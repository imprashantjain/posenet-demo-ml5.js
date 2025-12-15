let capture;
let poseNet;
let singlePose = null;
let skeleton = null;

function setup() {
  createCanvas(800, 400);

  capture = createCapture(VIDEO);
  capture.size(800, 400);
  capture.hide();

  // Initialize PoseNet
  poseNet = ml5.poseNet(capture, modelLoaded);
  poseNet.on('pose', receivedPoses);
}

function modelLoaded() {
  console.log("PoseNet Model Loaded");
}

function receivedPoses(poses) {
  if (poses.length > 0) {
    singlePose = poses[0].pose;   // store pose
    skeleton = poses[0].skeleton; // store skeleton
  }
}

function draw() {
  image(capture, 0, 0, width, height);

  // Draw keypoints
  if (singlePose) {
    fill(255, 0, 0);
    noStroke();
    for (let i = 0; i < singlePose.keypoints.length; i++) {
      let kp = singlePose.keypoints[i];
      if (kp.score > 0.4) {
        ellipse(kp.position.x, kp.position.y, 10, 10);
      }
    }

    // Draw skeleton
    stroke(0, 255, 0);
    strokeWeight(2);
    for (let j = 0; j < skeleton.length; j++) {
      line(
        skeleton[j][0].position.x,
        skeleton[j][0].position.y,
        skeleton[j][1].position.x,
        skeleton[j][1].position.y
      );
    }
  }
}








