const board = document.getElementById("board");
const gameOverScreen = document.getElementById("game-over-screen");
const gameResultText = document.getElementById("game-result");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameRunning = true;

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleClick(index));
    board.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (!gameRunning || cells[index] !== "") return;

  cells[index] = currentPlayer;
  if (checkWin()) {
    endGame(`${currentPlayer} wins!`);
    return;
  }

  if (cells.every(cell => cell !== "")) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  renderBoard();
}

function checkWin() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winConditions.some(condition => 
    condition.every(i => cells[i] === currentPlayer)
  );
}

function endGame(message) {
  gameRunning = false;
  gameResultText.textContent = message;
  gameOverScreen.classList.add("show");
  gameOverScreen.style.display = "flex";
}

function restartGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameRunning = true;
  gameOverScreen.classList.remove("show");
  gameOverScreen.style.display = "none";
  renderBoard();
}

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  if (!gameRunning && key === "enter") {
    restartGame();
  }

  if (!gameRunning && key === "h") {
    window.location.assign("../../index.html");
  }
});

renderBoard();
