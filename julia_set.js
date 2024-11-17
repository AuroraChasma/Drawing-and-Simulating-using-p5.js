let canvasWidth = 1920;
let canvasHeight = 1080;

//Julia set parameters
let cRe = -0.8;
let cIm = 0.156;

function setup()
{
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(1);
}

function draw()
{
  loadPixels();

  //Ranges of X and Y axis(or Real or Imaginary axis)
  let xmin = -2.5;
  let xmax = 2.5;
  let ymin = -2.5;
  let ymax = 2.5;

  let maxIterations = 100;

  for(let x = 0; x < canvasWidth; x++)
  {
    for(let y = 0; y < canvasHeight; y++)
    {
      // real and imaginary component of complex number z (a + bi)
      let realComponent = map(x, 0, canvasWidth, xmin, xmax); // a
      let imgComponent = map(y, 0, canvasHeight, ymin, ymax); // b


      let iterationNo = 1;
      while(iterationNo <= maxIterations)
      {
        //                       z^2 = (a+bi)^2 = (a^2 - b^2) + (2ab)i
        //Real part of (a+bi)^2   =              a^2            -           b^2
        let zSquaredRealComponent = realComponent*realComponent - imgComponent*imgComponent;
        //Img Part of (a+bi)^2    =              2abi
        let zSquaredImgComponent  = 2 * realComponent * imgComponent;
        
        //    z_n+1       =        z^2        +   c
        realComponent = zSquaredRealComponent +  cRe;
        imgComponent  = zSquaredImgComponent  +  cIm;

        //if |z|^2 > 4 or |z| > 2, it is guaranteed that the point is not part of mandelbrot set 
        if(abs(realComponent*realComponent + imgComponent*imgComponent) > 4)
        {
          break;
        }

        iterationNo++;
      }

      pixelBrightnessValue = map(iterationNo, 0, maxIterations, 0 ,255); // mapping iterationNo to color values(0-255)
      if(iterationNo === maxIterations) pixelValue = 0; //black if part of mandelbrot set

      //setting pixel colors
      pix = (x + y * width) * 4;
      pixels[pix + 0] = pixelBrightnessValue;
      pixels[pix + 1] = pixelBrightnessValue;
      pixels[pix + 2] = pixelBrightnessValue;
      pixels[pix + 3] = 255;
    }
  }

  updatePixels();
  noLoop();
}

