// DEKLARERA 
Kryp ettKryp; 

void setup() {
  size(640, 360);
  stroke(126);
  // INITIERA 
  // med aktuella variabler
  ettKryp = new Kryp(random(width), random(height), random(2, 40));
}

void draw() {
  // ANVÄND FUKTIONALITET
  ettKryp.move(); 
  ettKryp.display();
}
