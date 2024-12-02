let song;
let font;
let mFFT;
let rectDim = 20; 
let randomSeedValue = 0;
let rectDimSlider;

let angle = 0;

function preload() {
  song = loadSound('../Brat_360_1min.MP3');
  font = loadFont('../DTRandomDisplay-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER-250);
  mFFT = new p5.FFT(0.8, 512);
  rectDimSlider = createSlider(5, 50, 20, 1);
  rectDimSlider.position(20, 20);
  rectDimSlider.style('width', '200px');
}

function draw() {

  rectDim = rectDimSlider.value();
  let spectrum = mFFT.analyze();
  let energy = 0;
  for (let i = 0; i < spectrum.length; i++) {
    energy += spectrum[i];
  }

  let energy0 = mFFT.getEnergy(100, 5000);
  let fontSize = map(energy0, 0, 255, 0, 500);

  if (energy > 0 && energy <= 3000) {
    randomSeedValue = frameCount;
    angle += radians(1); 
  }
  randomSeed(randomSeedValue);

  noStroke();
  for (let y = 0; y < height; y += rectDim) {
    for (let x = 0; x < width; x += rectDim) {

      let baseR = 127;
      let baseG = 206;
      let baseB = 51;

      let r = baseR + random(-20, 20);
      let g = baseG + random(-50, 50);
      let b = baseB + random(-20, 20);
      r = constrain(r, 0, 255);
      g = constrain(g, 0, 255);
      b = constrain(b, 0, 255);

      fill(r, g, b);
      rect(x, y, rectDim, rectDim);
    }
  }


  push();
  translate(width / 2, height / 2);
  rotate(angle);
  fill(0);
  textSize(fontSize);
  text('brat', 0, 0);
  pop();
}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
