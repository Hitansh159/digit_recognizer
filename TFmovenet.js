let model;
LoadTFModel().then((t) => {
  model = t;

});

function setup() {
  // Setting up canvas as background
  canvas = createCanvas(640, 480);

  // Seting up camera to capture input
  capture = createCapture(VIDEO);
  capture.size(192, 144)
  capture.hide();
}

function draw() {
  // Settign background to gray
  background(150);

  // drawing video feed captured from webcam
  image(capture, 0, 0);

  // Drawing frame rate on video
  stroke(150);
  textSize(25)
  text(frameRate(), 5, 25);


  if (model) {
    // infering from image captured
    let pred;
    Infer(threshold = 0.3).then((res) => {
      
      pred = res[0];

      // Drawing circles for predicted parts
      for (var i = 0; i < 17; i++) {
        if (i < 5) fill(255, 0, 0);
        
        circle(pred['keypoints'][i]['x'], pred['keypoints'][i]['y'], 5);
        fill(0);
      }
    });
  }
  else{
    stroke(0);
    textSize(25)
    text("Loading............", width/2, height/2);
  }
}

async function Infer(threshold) {
  let temp = await model.estimatePoses(capture.elt);
  return temp;
}

async function LoadTFModel() {
  const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
  let model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
  return model;
}