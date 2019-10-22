var magicSword; 
var playTime;
var loadTime;
var amp;
var level;

function preload(){
  magicSword = loadSound("In The Face Of Evil.mp3");
}

function setup(){
  cnv = createCanvas(800, 600);
  // account that timing to "millis" starts at preload (1.3-1.6) sec delay
  if (magicSword.isLoaded()){
    loadTime = millis();
    print(loadTime);
    magicSword.play();
  }
  
  amp = new p5.Amplitude();

  cnv.mouseClicked(function() {
    if (magicSword.isPlaying() ){
      magicSword.stop();
    } else {
      magicSword.play();
    }
  });

  fft = new p5.FFT();
}

function draw(){
  playTime = millis() - loadTime;
  print(mouseX, mouseY);
  mappedColor = map(level, 0, 1, 0, 255);
  background(mappedColor * 2);
  
  push();
  fill(5);
  quad(8, 605, 400, 300, 370, 605, 168, 605);
  quad(794, 605, 400, 300, 430, 605, 600, 605);
  quad(8, -5, 400, 300, 370, -5, 168, -5);
  quad(794, -5, 400, 300, 430, -5, 600, -5);
  quad(-8, 15, 400, 300, -8, 585, -8, 300);
  quad(808, 15, 400, 300, 808, 585, 808, 300);
  pop();


  // WAVEFORM
  push();
  //magicSword.amp(0.3);
  let waveform1 = fft.waveform();
  noFill();
  beginShape();
  stroke(77, 81, 255); // waveform is red
  strokeWeight(4);
  for (var i = 0; i< waveform1.length; i++){
    let x = map(i, 0, waveform1.length / 10, 0, width);
    let y = map( waveform1[i], -1, 1, 0, height);
    vertex(x ,y);
  }
  endShape();
  pop();

  push();
  //magicSword.amp(0.3);
  let waveform2 = fft.waveform();
  noFill();
  beginShape();
  stroke("teal");
  strokeWeight(4);
  for (var i = 0; i< waveform2.length; i++){
    let x = map(i, 0, waveform2.length / 10, 0, width);
    let y = map( waveform2[i], -1, 1, 0, height);
    vertex(x ,y/3);
  }
  endShape();
  pop();

  push();
  //magicSword.amp(0.3);
  let waveform3 = fft.waveform();
  noFill();
  beginShape();
  stroke("yellow"); 
  strokeWeight(4);
  for (var i = 0; i< waveform3.length; i++){
    let x = map(i, 0, waveform3.length / 10, 0, width);
    let y = map( waveform3[i], -1, 1, 0, height);
    vertex(x ,y*1.6);
  }
  endShape();
  pop();

  level = amp.getLevel();
  print(level);

  rectMode(CENTER);
  push();
  //magicSword.amp(1);
  cSize1 = map(level, 0, 1, 0, width);
  noStroke();
  let lerping = lerpColor(color("white"), color("purple"), level);
  fill(lerping);
  rect(width / 2, height / 2, cSize1 * 1, cSize1 * 1)
  pop();

  
  cSize2 = map(level, 0, 1, 0, width /2);
  fill(105, 111, 255);
  rect(width / 2, height / 2, cSize2, cSize2);
  // TEST TEST TEST

  //let spectrum = fft.analyze();
  //noStroke();
  //fill(0,255,0); // spectrum is green
  //for (var i = 0; i< spectrum.length; i++){
  //  let x = map(i, 0, spectrum.length, 0, width);
  //  let h = -height + map(spectrum[i], 0, 255, height, 0);
  //  rect(x, height, width / spectrum.length, h )
  //}

  // Coloring circle with a gradient
  //if(playTime > 6000){
  //  for(var i = 0; i < width; i++){
  //    grad1 = lerpColor(color("purple"), color("yellow"), map(i, 0, width, 0, 1));
  //    stroke(grad1);
  //    line(i, 0, i, height);
  //  }
  //}
}
