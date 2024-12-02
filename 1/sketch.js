let song;
let font;
let peaks;
let letters = "*/FallinloveAGAINAGAIN****";
let backgroundColor;

function preload() {
  song = loadSound('../romantic_3min.MP3');
  font = loadFont('../font11.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundColor = color(127, 206, 51);
  background(backgroundColor);
  textFont(font);
  textAlign(CENTER, CENTER);

  peaks = song.getPeaks(width * 5);

  noLoop();
}

function draw() {
  background(backgroundColor);
  let numPeaks = peaks.length;
  let numLetters = letters.length;

  let textSizeValue = 30
  textSize(textSizeValue);

  let cols = Math.floor(width / textSizeValue);
  let rows = Math.floor(height / textSizeValue);
 
  let totalCells = cols * rows;
  let peaksPerCell = Math.floor(numPeaks / totalCells);

  let peakIndex = 0;
  let letterIndex = 0;

  for (let y = textSizeValue / 2; y < height; y += textSizeValue) {
    for (let x = textSizeValue / 2; x < width; x += textSizeValue) {

      let sumAmplitude = 0;
      for (let i = 0; i < peaksPerCell; i++) {
        if (peakIndex < numPeaks) {
          sumAmplitude += abs(peaks[peakIndex]);
          peakIndex++;
        }
      }
      let avgAmplitude = sumAmplitude / peaksPerCell;

      let alpha = map(avgAmplitude, 0, 1 , 0, 255);

      let letter = letters.charAt(letterIndex % numLetters);
      letterIndex++;

      fill(0, alpha);
      text(letter, x, y);
    }
  }
}
