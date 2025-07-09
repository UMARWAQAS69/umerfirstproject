const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
let gameRunning = true;

let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];

function setupGame() {
  bricks = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
  x = canvas.width / 2;
  y = canvas.height - 30;
  dx = 2;
  dy = -2;
  paddleX = (canvas.width - paddleWidth) / 2;
  gameRunning = true;
  const screen = document.getElementById("game-over-screen");
  screen.classList.remove("show");
  screen.style.display = "none";
}

function restartGame() {
  setupGame();
  draw();
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  const key = e.key.toLowerCase();
  if (key === "arrowright" || key === "d") rightPressed = true;
  else if (key === "arrowleft" || key === "a") leftPressed = true;
  if (!gameRunning && key === "enter") restartGame();
  if (!gameRunning && key === "h") window.location.assign("../../index.html");
}

function keyUpHandler(e) {
  const key = e.key.toLowerCase();
  if (key === "arrowright" || key === "d") rightPressed = false;
  else if (key === "arrowleft" || key === "a") leftPressed = false;
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x <