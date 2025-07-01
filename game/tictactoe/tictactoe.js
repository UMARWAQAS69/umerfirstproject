const board = document.getElementById("board");

let currentPlayer = "X";
let cells = Array(9).fill("");

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
  if (cells[index] !== "") return;
  cells[index] = currentPlayer;
  if (checkWin()) {
    alert(`${currentPlayer} wins!`);
    resetBoard();
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

function resetBoard() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  renderBoard();
}

renderBoard();
