void setup() {
  size(576, 576); // dimensions of canvas
  background(#ffffff); // black background
  noStroke(); // no border
  frameRate(100);
}


void draw() {
  stroke(#000000);
  strokeWeight(5);
  smooth();
  fill(#F9FF00); // yellow fill;
  ellipse(288, 288, 576, 576); // face border;
  fill(#000000);
  ellipse(288, 288, 415, 398); // black smile circle;
  fill(#F9FF00);
  noStroke();
  float cycle = abs(sin(radians(frameCount))*100);
  
  println(cycle); 

    ellipse(288, 263, 415, 398-cycle); // yellow smile circle;

  arc(288, 288, 425, 405, PI-(PI/22), (2*PI)+PI/18);
  fill(#000000);
  ellipse(217, 190, 38, 106); // left eye
  ellipse(339, 190, 38, 106); // right eye
  noStroke();
  fill(#F9FF00); 
  


  frame.setTitle(mouseX + ", " + mouseY);
}

