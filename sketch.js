let canvasWidth = 1920;
let canvasHeight = 1080;

// Julia set parameters
let cRe = -0.8; // Real part of constant c
let cIm = 0.156; // Imaginary part of constant c

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(1);
}

function draw() {
  loadPixels();

  let maxIterations = 300;

  // Range of the complex plane to display
  let xmin = -2;
  let xmax = 2;
  let ymin = -2;
  let ymax = 2;

  for (let x = 0; x < canvasWidth; x++) {
    for (let y = 0; y < canvasHeight; y++) {
      // Map pixel coordinates to the complex plane
      let realComponent = map(x, 0, canvasWidth, xmin, xmax);
      let imgComponent = map(y, 0, canvasHeight, ymin, ymax);

      let iterationNo = 0;

      // Iteratively compute z = z^2 + c
      while (iterationNo < maxIterations) {
        // z^2 = (a + bi)^2 = (a^2 - b^2) + (2ab)i
        let zSquaredRealComponent =
          realComponent * realComponent - imgComponent * imgComponent;
        let zSquaredImgComponent = 2 * realComponent * imgComponent;

        // Update z to z^2 + c
        ///Instead of c being the point on the canva, in julia sets, it is set to a constant
        realComponent = zSquaredRealComponent + cRe;
        imgComponent = zSquaredImgComponent + cIm;

        // Check for divergence
        if (realComponent * realComponent + imgComponent * imgComponent > 4) {
          break;
        }

        iterationNo++;
      }

      // Map the number of iterations to a color
      let pixelValue = map(iterationNo, 0, maxIterations, 0, 255);
      let pixelIndex = (x + y * canvasWidth) * 4;

      pixels[pixelIndex + 0] = pixelValue; // Red
      pixels[pixelIndex + 1] = pixelValue; // Green
      pixels[pixelIndex + 2] = pixelValue; // Blue
      pixels[pixelIndex + 3] = 255; // Alpha
    }
  }

  updatePixels();
  noLoop(); // Stop draw loop for static rendering
}
