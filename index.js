const cellElements = document.querySelectorAll(".cell");
const result = document.querySelector(".overlay");
const winner = document.querySelector(".winner");
const restartBtn = document.querySelector(".result button");
let X_CLASS = "x";
let O_CLASS = "o";
let currentPlayer = X_CLASS;
startGame();
function startGame() {
  cellElements.forEach((cell) => {
    cell.addEventListener("click", (e) => handleCell(e, currentPlayer));
    cell.addEventListener("mouseenter", (e) => hoverEffect(e, currentPlayer));
    cell.addEventListener("mouseleave", (e) => removeHover(e));
  });
}

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCell(e, player) {
  let cell = e.target;
  if(cell.classList.contains('selected')){
    return
  }
  cell.classList.add("selected", player);

  //change the inner text
  changeText(cell, currentPlayer);

  //check for winner
  if (checkWinner(player)) {
    result.style.display = "flex";
    winner.textContent = `Player ${player} wins`;
  } else if (checkDraw()) {
    result.style.display = "flex";
    winner.textContent = `Draw`;
  }

  //swap player
  swapPlayer(currentPlayer);
}
function hoverEffect(e, player) {
  let cell = e.target;
  if (cell.classList.contains("selected")){
    cell.style.cursor = 'not-allowed';
    return
  }
  cell.style.color = "lightgrey";
  cell.textContent = player;
}
function removeHover(e) {
  let cell = e.target;
  if (cell.classList.contains("selected")) return;
  cell.style.color = "black";
  cell.textContent = "";
}
function changeText(cell, player) {
  cell.style.color = "black";
  cell.textContent = player;
//   cell.style.cursor = 'not-allowed';
}
function swapPlayer(player) {
  currentPlayer = player === X_CLASS ? O_CLASS : X_CLASS;
}
function checkWinner(player) {
  return WINNING_COMBOS.some((combo) => {
    return combo.every((index) => {
      return (
        cellElements[index].classList.contains(player) ||
        cellElements[index].classList.contains(player)
      );
    });
  });
}
function checkDraw() {
  return Array.from(cellElements).every((cell) => {
    return cell.classList.contains("selected");
  });
}
restartBtn.addEventListener("click", restartGame);
function restartGame() {
  result.style.display = "none";
  currentPlayer = X_CLASS;
  cellElements.forEach((cell) => {
    cell.textContent = "";
    cell.className = "cell";
    cell.style.cursor = '';
    // cell.removeEventListener("click", handleCell);
    // cell.removeEventListener("mouseenter", hoverEffect);
    // cell.removeEventListener("mouseleave", removeHover);
  });
  startGame();
}
