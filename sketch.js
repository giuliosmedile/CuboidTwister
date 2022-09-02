//const density = "   .:-=+*#%@"
//const density = "    `-.',~\"_:;^r>*?\\/Licl7vz1xt{}]Ffujy2SoaZemwXPEhk6$9qKOdHDR8MWgN#BQ@";
//const density = "    .:-i|=+%O#@";
const density = ' .:░▒▓█';
let video;
let asciiDiv;

function setup() {
  createCanvas(70, 70, WEBGL);
  asciiDiv = createDiv();
}

function draw() {
  drawTorus();
  
  video = get();
  video.loadPixels();
  
  // This piece of code (which actually does the ASCII magic conversion)
  // is shamelessly stolen from Daniel Shiffman 
  // https://thecodingtrain.com/CodingChallenges/166-ascii-image.html
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}

function drawTorus() {
  background(0);
  noStroke();
  
  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, 100 * cos(frameCount * 0.1), 100 * -sin(frameCount * 0.1), 100 * sin(frameCount * 0.01));
  
  push();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  torus(15, 3);
  box(15);
  pop();
}

function mousePressed() {
  noLoop();
}

function mouseReleased() {
  loop();
}
