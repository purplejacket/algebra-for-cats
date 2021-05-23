function setup() {
  createCanvas(windowWidth, windowHeight);
  // Put setup code here
  //graph(func, displaySize, length, xOffset, yOffset)
  // ( x )  => x + 3
  const func1 = ( x )  => x / 3
  const func2 = ( x )  => x * x
  const func3 = ( x )  => 5 * Math.cos(x)
  const func4 = ( x )  => 5 * Math.sin(x)
  const func5 = ( x )  => 5 * Math.tan(x)
  const func6 = ( x )  => 10 * x / (x * x)
  const func7 = (x) => 5 * Math.atan(x);
  const func8 = ( x )  => x + 3
  const funcArray = [func1, func2, func3, func4];
  const options = {offset:{x:0, y: 0, }, pointRatio: 100};
  graph(funcArray, options);
}

function draw() {
  // Put drawings here
  // fill(234, 31, 81);
}

// This Redraws the Canvas when resized
windowResized = function () {
  resizeCanvas(windowWidth, windowHeight);
};

// graph( func || [ func ] , options?  )
function graph(f, options = {}) {
  const { displaySize = 400, length = 10, offset = { x: 0, y: 0 }, pointRatio = 100, numberSize = 10, pointSize = 2} = options;
  const scale = displaySize / length;
  const center = { x: displaySize / 2 + offset.x * scale, y: displaySize / 2 - offset.y * scale }
  drawGrid(displaySize, offset, scale, center, numberSize);
  processFunctions(f, displaySize, scale, center, pointRatio, pointSize);
  
}

function processFunctions(f, displaySize, scale, center, pointRatio, pointSize){
  if(f instanceof Function) {
    drawFunction(f, displaySize, scale, center, pointRatio, pointSize);
  } else if( Array.isArray(f)) {
    f.forEach(element => {
      drawFunction(element, displaySize, scale, center, pointRatio, pointSize);
    });
  } else{
    throw "Please pass a function as the first argument";
  }
}

function drawFunction(f, displaySize, scale, center, pointRatio, pointSize) {
  const pointCount = displaySize * pointRatio;
  fill("blue")
  let delta = displaySize / pointCount; // divide X axis into tiny pieces of size POINT_COUNT
  // draw from points from negative to positive.
  for (let i = -pointCount / 2; i < pointCount / 2; i += 1) {
    let x = delta * i; // calculate X for this iteration
    let y = f(x); // calculate Y by passing X into function
    x *= scale; //scale X
    y *= scale; //scale Y
    x = center.x + x; // center Y
    y = center.y - y; // center X
    if (
      x > 0 &&
      y > 0 &&
      x < displaySize &&
      y < displaySize
    ) { // Only draw circle if its within Grid
      circle(x, y, pointSize);
    }
  }
}

function drawGrid(displaySize, offset, scale, center, numberSize) {
  rect(0, 0, displaySize, displaySize);
  // line(0, center.y, displaySize, center.y);
  // line(center.x, 0, center.x, displaySize);
  // circle(center.x, center.y, 10);
  for (let i = scale; i < displaySize; i += scale) {
    stroke("skyblue");
    line(0, i, displaySize, i);
    line(i, 0, i, displaySize);
  }
  stroke("red");
  line(0, center.y, displaySize, center.y);
  line(center.x, 0, center.x, displaySize);
  for (let i = scale; i < displaySize; i += scale) {
    strokeWeight(3);
    stroke('black');
    point(i, displaySize / 2 - offset.y * scale);
    point(displaySize / 2 + offset.x * scale, i);
  }
  axisNumbers(displaySize, center, scale, numberSize);

}

function axisNumbers(displaySize, center, scale, numberSize) {
  strokeWeight(0.1);
  textSize(numberSize);
  xAxisNumbers(displaySize, center, scale);
  yAxisNumbers(displaySize, center, scale);
}

function xAxisNumbers(displaySize, center, scale) {
  //creating the x positives numbers
  const positiveNumberCount = (displaySize - center.x) / scale;
  for (let i = 1; i < positiveNumberCount; i += 1) {
    text(i, center.x + scale * i - 3, center.y + 10);
  }
  const negativeNumberCount = center.x / scale;
  for (let i = 1; i < negativeNumberCount; i += 1) {
    text(-i, center.x - i * scale - 3, center.y + 10);
  }
}

function yAxisNumbers(displaySize, center, scale) {
  const positiveNumberCount = (center.y / scale);
  for (i = 1; i < positiveNumberCount; i++) {
    text(i, center.x + 3, center.y - scale * i + 3);
  }
  const negativeNumberCount = (displaySize - center.y) / scale;
  for (i = 1; i < negativeNumberCount; i++) {
    text(-i, center.x + 3, center.y + scale * i + 3);
  }
}