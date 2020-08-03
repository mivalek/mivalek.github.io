


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const FPS = 400;
const ballFreq = 1;
const height = innerHeight * .9;
let width = height / 2;

let bins = 50,
    padX = Math.min(width / 10, width / (bins - 1));


width = Math.min(width, bins * padX);
canvas.width = width;
canvas.height = height;

let padY = padX/1.5,
    topPinY = 4*padY,
    pinRadius = Math.floor(padX * .10),
    ballX = width / 2,
    ballY = 0,
    ballRadius = Math.floor(padX * .2),
    speed = 1,
    gravity = 1,
    objects,
    distArray,
    interval
    tick = 0
    tock = 0;

function sampleBin() {
  let x = Math.random();
  if (x < 0.5) {
    return -1;
  } else {
    return 1
  }
}

/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

// function resolveCollision(particle, otherParticle) {
//     const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
//     const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
//
//     const xDist = otherParticle.x - particle.x;
//     const yDist = otherParticle.y - particle.y;
//
//     // Prevent accidental overlap of particles
//     if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
//
//         // Grab angle between the two colliding particles
//         const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
//
//         // Store mass in var for better readability in collision equation
//         const m1 = particle.mass;
//         const m2 = otherParticle.mass;
//
//         // Velocity before equation
//         const u1 = rotate(particle.velocity, angle);
//         const u2 = rotate(otherParticle.velocity, angle);
//
//         // Velocity after 1d collision equation
//         const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
//         const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };
//
//         // Final velocity after rotating axis back to original location
//         const vFinal1 = rotate(v1, -angle);
//         const vFinal2 = rotate(v2, -angle);
//
//         // Swap particle velocities for realistic bounce effect
//         particle.velocity.x = vFinal1.x;
//         particle.velocity.y = vFinal1.y;
//
//         otherParticle.velocity.x = vFinal2.x;
//         otherParticle.velocity.y = vFinal2.y;
//     }
// }

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x;
    const yVelocityDiff = particle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = 5;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = {x: 0, y: 0};

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
    }
}


function Pin(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.padX = padX;
  this.padY = padY;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = '#242943';
    c.strokeStyle = "#5a5f7a";
    c.lineWidth = 3;
    c.fill();
    c.stroke();
    c.closePath;
  }
}

function Ball(x, y, radius, dx, dy) {
  this.x = x + (Math.random() - 0.5) * 2;
  this.y = y + (Math.random() - 1) * 10;
  this.radius = radius;
  this.velocity = {x: dx, y: dy};
  this.mass = 1,
  this.position = 1,
  this.rest = height,
  this.touchdown = false,
  this.colliding = false,
  this.collisionWith = -1;

  this.update = function() {
    console.log({
      colliding: this.colliding,
      colwith: this.collisionWith,
      dist: dist(this, objects[2]),
      dx: this.velocity.x
    });
    if (this.velocity.x == 0 && this.velocity.y == 0) {

      this.draw();
    } else {
      this.dist = []
      if (this.y < lastPin.y) {
        this.velocity.y += gravity;
        this.velocity.x *= .8;
        if (!this.colliding) {
          for (let j = 0; j < objects.length; j++) {
            this.dist.push(dist(this, objects[j]));
          }
          // objects.forEach((obj, i) => {
          //   this.dist.push(dist(this, obj));
          // });
          for (let i = 0; i < this.dist.length; i++) {
            if (this.dist[i] <= this.radius + pinRadius) {
              this.velocity.x = sampleBin() * this.velocity.y;
              this.velocity.y = this.velocity.y / 2;
              // resolveCollision(this, objects[i]);
              this.colliding = true;
              this.collisionWith = i;
            }
          }
        } else {
          if (dist(this, objects[this.collisionWith]) >= this.radius + pinRadius) {
            this.colliding = false;
          }
        }

      } else {
        this.velocity.x = 0;
        this.position = Math.floor((this.x + padX / 2) / padX);
        if (!this.touchdown) {
          this.rest = bottomPosition[this.position];
          bottomPosition[this.position] -= 1.8 * this.radius;
          this.touchdown = true;
          if (bottomPosition[this.position] <= lastPin.y) {
            gameOver = true;
          }
        }
        if (this.y + this.radius + this.velocity.y > this.rest) {
          if (this.velocity.y < 1) {
            this.velocity.y = 0;
          } else {
            this.velocity.y = -this.velocity.y * .2;
          }
        } else if (this.velocity.y != 0){
          this.velocity.y += gravity;
          this.velocity.x *= .8;
        }
      }
      if (Math.abs(this.x - width / 2) + this.radius > width / 2) {
        this.velocity.x = -this.velocity.x * .9;
      }

      // if (Math.abs(this.x - width / 2) + this.radius > this.y / 1.33) {
      //   this.velocity.x = -this.velocity.x * .9;
      // }


      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.draw();
    }
  }

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "#dd2255";
    c.fill();
    c.closePath;
  }
}

let balls,
    nPins,
    lastPin
    bottomPosition = [];

for (let i = 0; i < bins; i++) {
  bottomPosition.push(height);
}

const init = () => {
  balls = [];
  objects = [];
  let gameOver;

// balls.push(new Ball(ballX, ballY, ballRadius, 0, speed));
  let firstRow = Math.min(bins - 1 + bins % 2, 5);
  let pinsPerRow;
  for (let i = 0; i < bins - 1; i ++) {
    pinsPerRow = Math.min(firstRow + i, bins + i + bins % 2);
    for (let j = 0; j < pinsPerRow; j ++) {
      objects.push(new Pin((width - (pinsPerRow - 1) * padX)/ 2 + j * padX, topPinY + padY * i, pinRadius));
    }
  }
  nPins = objects.length;
  lastPin = objects[nPins - 1];
  for (let i = 0; i < nPins; i++) {
    objects[i].draw();
  }
}


const animate = () => {
  gaveOver = false;
  c.clearRect(0, 0, width, height);
  if (tick == 0) {
    balls.push(new Ball(ballX, ballY, ballRadius, 0, speed));
  }
  balls.forEach(ball => ball.update());
  for (let i = 0; i < nPins; i++) {
    objects[i].draw();
  }
  // c.beginPath();
  // c.moveTo(width / 2, 0);
  // c.lineTo(width / 2 + height, 1.33 * height);
  // c.stroke();

  tick++;
  if (tick == ballFreq) {
    tock++;
    tick = 0;
  }
  if (gameOver) {
    clearInterval(interval);
  }
  // console.log(bottomPosition);
}
const dist = (o1, o2) => {
  return Math.sqrt((o1.x - o2.x) ** 2 + (o1.y - o2.y) ** 2);
}


// c.beginPath();
// c.moveTo((width - padX) / 2, 0);
// c.lineTo((width - padX) / 2, topPinY - 2.7 * padY - 20);
// c.arc((width - padX) / 2 - 20, topPinY - 2.7 * padY, 20, 0, Math.PI / 4, false);
// c.lineTo(0, topPinY + padY * (bins - 4.7));
// c.lineTo(0, 0);
// c.closePath();
// c.fillStyle = '#242943';
// c.strokeStyle = "#5a5f7a";
// c.lineWidth = 5;
// c.fill();
// c.stroke();
//
// c.beginPath();
// c.moveTo((width + padX) / 2, 0);
// c.lineTo((width + padX) / 2, topPinY - 2.7 * padY - 20);
// c.arc((width + padX) / 2 + 20, topPinY - 2.7 * padY, 20, Math.PI, Math.PI * 3/4, true);
// c.lineTo(width, topPinY + padY * (bins - 4.7));
// c.lineTo(width, 0);
// c.closePath();
// c.fillStyle = '#242943';
// c.strokeStyle = "#5a5f7a";
// c.lineWidth = 5;
// c.lineJoin = "round";
// c.fill();
// c.stroke();


init();


// for (let i = 0; i < bins + 1; i ++) {
//   c.beginPath();
//   c.rect(lastPin.x - i * padX, topPinY + padY * (bins - 2), 3, height - (topPinY + padY * (bins - 2)));
//   c.lineWidth = 5;
//   c.strokeStyle = "#5a5f7a";
//   c.fillStyle = '#242943';
//   c.stroke();
//   c.fill();
// }
//
// c.beginPath();
// c.moveTo(width / 2, 0);
// c.lineTo(width / 2 + height, 1.33* height);
// c.stroke();
//
// c.beginPath();
// c.rect(0, 0, width, height);
// c.lineWidth = 10;
// c.strokeStyle = "#5a5f7a";
// c.fillStyle = '#242943';
// c.stroke();




interval = setInterval(animate, 1000/FPS);
