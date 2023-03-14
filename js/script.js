const gridEl = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 1000;
const boardHeight = 450;
const ballDiameter = 20;

let timeId;
let xDirection = -2;
let yDirection = 2;
let score = 0;

const ballStart = [490, 37];
let ballCurrentPosition = ballStart;

const userStart = [450, 20];
let currentPosition = userStart;

// <!-- ========== Start Block ========== -->
// CREAT BLOCKS
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// ALL BLOCKS
const blocks = [
  new Block(10, 420),
  new Block(120, 420),
  new Block(230, 420),
  new Block(340, 420),
  new Block(450, 420),
  new Block(560, 420),
  new Block(670, 420),
  new Block(780, 420),
  new Block(890, 420),
  new Block(10, 390),
  new Block(120, 390),
  new Block(230, 390),
  new Block(340, 390),
  new Block(450, 390),
  new Block(560, 390),
  new Block(670, 390),
  new Block(780, 390),
  new Block(890, 390),
  new Block(10, 360),
  new Block(120, 360),
  new Block(230, 360),
  new Block(340, 360),
  new Block(450, 360),
  new Block(560, 360),
  new Block(670, 360),
  new Block(780, 360),
  new Block(890, 360),
  // new Block(10, 310),
  new Block(120, 310),
  new Block(230, 310),
  new Block(340, 310),
  new Block(450, 310),
  new Block(560, 310),
  new Block(670, 310),
  new Block(780, 310),
  // new Block(890, 310),
  // new Block(10, 280),
  // new Block(120, 280),
  new Block(230, 280),
  new Block(340, 280),
  new Block(450, 280),
  new Block(560, 280),
  new Block(670, 280),
  // new Block(780, 280),
  // new Block(890, 280),
];

// ADD BLOCKS
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const blockEl = document.createElement("div");
    blockEl.classList.add("block");
    blockEl.style.left = blocks[i].bottomLeft[0] + "px";
    blockEl.style.bottom = blocks[i].bottomLeft[1] + "px";
    gridEl.appendChild(blockEl);
  }
}
addBlocks();
// <!-- ========== End Block ========== -->

// <!-- ========== Start User ========== -->
// ADD USER
const user = document.createElement("div");
user.classList.add("user");
drawUser();
gridEl.appendChild(user);

// MOVE USER
document.addEventListener("keydown", moveUser);
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 30;
        drawUser();
      }
      break;

    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 30;
        drawUser();
      }
      break;
  }
}

// DRAW USER
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}
// <!-- ========== End User ========== -->

// <!-- ========== Start Ball ========== -->
// DRAW ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

// CRAET BALL
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
gridEl.appendChild(ball);

// MOVE BALL
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  chakForCollisions();
}
timeId = setInterval(moveBall, 10);

// CHAK FOR CALLISIONS
function chakForCollisions() {
  // CHACK FOR BLOCK COLLISIONS
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.textContent = score;

      // CHACK FOR WIN
      if (blocks.length === 0) {
        scoreDisplay.textContent = 'YOU WIN!';
        clearInterval(timeId);document.removeEventListener('keydown', moveUser);
      }
    }
  }

  // CHACK FOR WALL COLLISIONS
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }

  // CHACK FOR USER COLLISIONS
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

    if (ballCurrentPosition[1] <= 0) {
      // CHACK FOR GAME OVER
      clearInterval(timeId);
      scoreDisplay.textContent = "You Lose";
      document.removeEventListener("keydown", moveUser);
    }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }

  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }

  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
// <!-- ========== End Ball ========== -->
