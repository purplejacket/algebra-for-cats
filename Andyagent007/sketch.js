let wolf;
function preload() {
  // Load model with normalize parameter set to true
  wolf = loadModel('obj/Wolf_obj.obj', true);
  
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}
function draw() {
  background("#f4a261");
  noStroke(); // Quita las lineas de los polygonos
  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
  ambientLight(42, 157, 143);
  pointLight(233, 196, 106, locX, locY, 100);
  push()
  translate(mouseX - width / 2, mouseY - height / 2)
  scale(2, -2, 2); // Scaled to make model fit into canvas
  specularMaterial("#264653");
  rotateY(frameCount * 0.01);
  model(wolf);
  pop()
  // Uncomment the code below for wolf party
  for (let i = 0; i < 2; i++) {
    push()
    translate(random(width) - width / 2, random(height) - height / 2)
    let size = random(3)
    scale(size, -size, size); // Scaled to make model fit into canvas
    specularMaterial(random(255), random(255), random(255));
    rotateY(frameCount * 0.01);
    model(wolf);
    pop()
  }
}