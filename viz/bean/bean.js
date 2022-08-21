
const urlParams = new URLSearchParams(window.location.search)
if (urlParams.get('cite') === 'true') {
  document.getElementById("cite").classList.add("show")
}

const sliderValueToFreq = (sliderValue) => {
  let freqValues = [100, 80, 60, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  return freqValues[sliderValue];
};

let background,
    bkg,
    canvas,
    c,
    beadFreq = sliderValueToFreq(+document.getElementById('beadFreq').value),
    nBins = 2,
    tick = 0,
    interval,
    height,
    width,
    tempWidth;

function binSliderChange () {
  nBins = +document.getElementById('nBins').value;
  clearInterval(interval);
  drawCanvas();
  beanMachine();
};

function freqSliderChange () {
  beadFreq = sliderValueToFreq(+document.getElementById('beadFreq').value);
  tick = 0;
};

// listen in on the sliders
document.getElementById('nBins').addEventListener("change", binSliderChange);
document.getElementById('beadFreq').addEventListener("change", freqSliderChange);
// listen in on the sliders
document.getElementById('nBins').addEventListener("touchmove", binSliderChange);
document.getElementById('beadFreq').addEventListener("touchmove", freqSliderChange);

function fact(num) {
  if (num === 0) {
    return 1;
  } else {
    return num * fact( num - 1 );
  }
}

function pbinom (nBins) {
  const middleBin = Math.floor(nBins/2);
  const comb = fact(nBins)/(fact(middleBin) * fact(nBins - middleBin));
  return Math.round(comb * (0.5 ** nBins) * 100) / 100;
}

const sum = arr => arr.reduce((a,b) => a + b, 0);

function sampleBin() {
  let x = Math.random();
  if (x < 0.5) {
    return -1;
  } else {
    return 1
  }
}

function dist(o1, o2) {
  return Math.sqrt((o1.x - o2.x) ** 2 + (o1.y - o2.y) ** 2);
}

function pickColour (colours) {
  return colours[Math.floor(Math.random() * colours.length)];
}

 // background = document.getElementById('background')
 // bkg = background.getContext('2d');
 // canvas = document.getElementById('main')
 // c = canvas.getContext('2d');



function drawCanvas() {
  background = document.getElementById('background'),
  bkg = background.getContext('2d'),
  canvas = document.getElementById('main'),
  c = canvas.getContext('2d'),
  height = 500,
  width = height/1.3;
  nBins = +document.getElementById('nBins').value;

  let tempWidth = Math.min(width / 10, width / nBins);

  width = Math.min(width, nBins * tempWidth);

  canvas.width = width;
  canvas.height = height;
  background.width = width;
  background.height = height;
  canvas.style.setProperty('left', ((innerWidth - width) / 2) + "px", "");
  background.style.setProperty('left', ((innerWidth - width) / 2) + "px", "");

}
// let beadFreq = 40;

function beanMachine () {

  const nPegRows = nBins - 1,
        probMiddleBin = pbinom(nBins);
        cols = [
          "#f08be2",
          "#db58c9",
          "#cc23b5",
          "#911180",
          "#ff6eec",
          "#d600ba"
        ];

  let beads = [],
      pegs = [],
      bins = [],
      // tick = 1,
      tock = 1,
      gameOver = false,
      beadCounter = 1,
      beadRestCounter = 0,
      beadsRunning = 1;



  const pegSpacingX = width / nBins,
        halfPegSpacingX = pegSpacingX / 2,
        pegSpacingY = Math.sqrt((pegSpacingX ** 2) - (halfPegSpacingX ** 2)),
        topPegY = pegSpacingY,
        bottomPegY = nBins * pegSpacingY;
        halfWidth = width / 2,
        beadSize = Math.max(5, Math.floor(halfPegSpacingX * 0.55)),
        beadMass = 1;
        pegSize = beadSize * 0.6,
        veloUnits = pegSpacingX / 100,
        binWidth = pegSpacingX - pegSize,
        halfBinWidth = binWidth / 2,
        binWallWidth = pegSize / 2;



  class Bead {
    constructor (beadNo) {
      let firstStep = Math.round(Math.random())
      this.x = width/2 + (Math.random() - 0.5) * 10 * veloUnits;
      this.y = 0 + (Math.random() - 0.5);
      this.r = beadSize;
      this.dx = 0;
      this.dy = veloUnits;
      this.mass = beadMass;
      this.colour = pickColour(cols);
      this.steps = [firstStep];
      this.pegsInWay = [0];
      this.bin = firstStep;
      this.rest = false;
      this.bottomColliding = false;
      this.wallsColliding = false;
      this.update = function () {
        if (!this.rest) {
          this.x += this.dx;
          this.y += this.dy;
          this.dx *= 0.9;
          this.dy += veloUnits;
          this.binWalls.bottom = bins[this.bin].bottomBall;
          if (this.pegsInWay.length != 0) {
            let distFromPeg = dist(this, pegs[this.pegsInWay[0]]) - (this.r + pegSize);
            if (distFromPeg <= 0) {
              this.pegBounce();
            }
          } else {
            if (this.y > bottomPegY + 10) {
              if (this.x - this.r < this.binWalls.left || this.x + this.r > this.binWalls.right) {
                  if (!this.wallsColliding) {this.wallBounce()};
                  this.wallsColliding = true;
              } else {
                this.wallsColliding = false;
              }

              if (this.y + this.r > this.binWalls.bottom) {
                  this.dx = 0;
                  this.dy = 0;
                  this.y = height + 100;
                  this.rest = true;
                  beadRestCounter++;
                  bins[this.bin].bottomBall -= 1;
                  if (bins[this.bin].bottomBall - bottomPegY < beadsRunning * probMiddleBin * 1) {
                    gameOver = true;
                  }
                }
            } else {
              this.x += (this.dx + (Math.random() - 0.5)) / 2;
            }
          }
        }
        this.draw();
      };
      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.colour;
        c.fill();
        c.closePath;
      };
      this.pegBounce = function () {
        this.dy = -this.dy * 0.1 + (Math.random() - 0.5) * veloUnits;
        this.dx = ((this.steps[0] - 0.5) * 12 + (Math.random() - 0.5)) * veloUnits;
        this.pegsInWay.shift();
        this.steps.shift();
      };

      this.wallBounce = function () {
        this.dy *= 0.4;
        this.dx *= -.65;
      };

      this.bottomBounce = function () {
        this.dy *= -0.5 * veloUnits;
        this.dx = sampleBin() * 1 * veloUnits;
      };

      let temp
      for (let i = 1; i < nPegRows; i++) {
        temp = Math.round(Math.random())
        this.steps.push(temp);
        this.pegsInWay.push(this.pegsInWay[i-1] + i + this.steps[i-1]);
        this.bin += temp;
      }

      this.binWalls = {
        left: bins[this.bin].left,
        right: bins[this.bin].right,
        bottom: bins[this.bin].bottomBall
      };
    }

  }

  class Peg {
    constructor (x, y) {
      this.x = x;
      this.y = y;
      this.r = pegSize;
      this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = '#242943';
        c.strokeStyle = "#5a5f7a";
        c.lineWidth = 3;
        c.fill();
        c.stroke();
        c.closePath;
      }
    }
  }

  class Bin {
    constructor (leftWall) {
      this.left = leftWall + binWallWidth;
      this.right = this.left + binWidth;
      this.top = bottomPegY;
      this.bottom = height - 10;
      this.bottomBall = height - 10;
      this.colour = pickColour(cols);
      this.draw = function () {
        c.beginPath();
        c.moveTo(this.left + 3, this.top);
        c.lineTo(this.left + 3, this.bottom - halfBinWidth);
        c.arc(this.left + halfPegSpacingX - binWallWidth, this.bottom - halfBinWidth, halfBinWidth - 3, Math.PI, 0, true);
        c.lineTo(this.right - 3, this.top);
        c.lineTo(this.right + binWallWidth, this.top);
        c.lineTo(this.right + binWallWidth, height);
        c.lineTo(leftWall, height);
        c.lineTo(leftWall, this.top);
        c.lineTo(this.left, this.top);
        c.closePath();
        c.fillStyle = '#242943';
        c.strokeStyle = "#5a5f7a";
        c.lineWidth = 1;
        c.lineJoin = "round";
        c.fill();
        c.stroke();
        bkg.beginPath();
        bkg.moveTo(this.left, this.bottomBall);
        bkg.lineTo(this.right, this.bottomBall);
        bkg.lineTo(this.right, this.bottom);
        bkg.lineTo(this.left, this.bottom);
        bkg.lineTo(this.left, this.bottomBall);
        bkg.closePath();
        bkg.fillStyle = this.colour;
        bkg.lineJoin = "round";
        bkg.fill();
      }
    }
  }

  function init() {
    for (let i = 0; i < nBins; i++) {
      for (let j = 0; j < i; j++) {
        pegs.push(new Peg(x = halfWidth - halfPegSpacingX * (i - 1) + pegSpacingX * j,
                          y = topPegY + pegSpacingY * i))
      }
      bins.push(new Bin(pegSpacingX * i));
    }
    beads.push(new Bead(0));
  }


  function animate() {
    if (!gameOver) {
      if (tick == beadFreq) {
        beads.push(new Bead(beadCounter));
        beadCounter++;
        tick = 0
      }
    }

    c.clearRect(0, 0, width, height);
    beads.forEach(bead => bead.update());
    bins.forEach(bin => bin.draw());
    pegs.forEach(peg => peg.draw());

    if ((beadsRunning == 0) & gameOver) {
      clearInterval(interval);
    }
    tick++;
    tock++;
    beadsRunning = beadCounter - beadRestCounter;
    // clean beads that have fallen off screen
    if (tock == 200) {
      beads.forEach((bead, i) => {if (beads[i].rest) {beads.splice(i, 1)}});
      tock = 1;
    }
  }

  init();
  interval = setInterval(animate, 4);
}

drawCanvas();
beanMachine();
