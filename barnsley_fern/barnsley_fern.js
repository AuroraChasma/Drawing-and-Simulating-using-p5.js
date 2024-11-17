let x = 0;
let y = 0;
let pX = 0;
let pY = 0;

let canvasWidth = 1920;
let canvasHeight = 1080;

function setup() {
  createCanvas(1920,1080);
  background(0);
}


function draw() {

  for(let i = 0; i < 1000; i++)
  {
    random_number = random();

    pX = map(x, -5, 5, 0, canvasWidth);
    pY = map(y, 0, 10, canvasHeight, 0);
  
    if(random_number < 0.01)
    {
      x = transformation(x, 0, 0, 0);
      y = transformation(y, 0, 0.16, 0);
    }
    else if(random_number < 0.86)
    {
      x = transformation(x, 0.85, 0.04, 0);
      y = transformation(y, -0.04, 0.85, 1.6);
    }
    else if(random_number < 0.93)
    {
      x = transformation(x, 0.2, -0.26, 0);
      y = transformation(y, 0.23, 0.22, 1.6);
    }
    else
    {
      x = transformation(x, -0.15, 0.28, 0);
      y = transformation(y, 0.26, 0.24, 0.44);
    }
    updatePixels();
    drawPoint(pX, pY);
  }

}

function transformation(x_or_y, a, b, c)
{
  x_or_y = a*x + b*y + c;
  return x_or_y;
}

function drawPoint()
{
  stroke(120, 200, 0);
  strokeWeight(1);
  point(pX, pY);
}
