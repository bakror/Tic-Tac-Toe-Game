// ====== Select DOM Elements ======
const Board = document.querySelectorAll("#grid-container .square"),
  gamePlay = document.querySelector("#instration"), // Shows current turn
  reset = document.getElementById("reset");

// ====== Game Variables ======
let isXTurn = true; // Track whose turn it is
let boardGame = Array(9).fill(""); // Represent board cells
let movesCount = 0; // Count total moves

// ====== Winning Patterns ======
const winPatterns = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

// ====== Check if there's a winner ======
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boardGame[a] &&
      boardGame[a] === boardGame[b] &&
      boardGame[a] === boardGame[c]
    )
      return boardGame[a]; // Return "X" or "O"
  }
  return null;
}

// ====== Handle Board Click ======
Board.forEach((square, i) =>
  square.addEventListener("click", () => {
    if (boardGame[i]) return; // Ignore if cell is already filled

    // Set current player
    let current = isXTurn ? "X" : "O";
    boardGame[i] = current;
    movesCount++;
    square.firstElementChild.textContent = current;
    square.style.pointerEvents = "none"; // Prevent clicking again

    // Check winner
    let winner = checkWinner();
    if (winner || movesCount === 9) {
      showAlert(winner); // Show alert for win/draw
      endGame(); // Disable board
      return;
    }

    // Switch turn
    isXTurn = !isXTurn;
    gamePlay.textContent = `${isXTurn ? "X" : "O"} turn`;
  })
);

// ====== End Game ======
const endGame = () => Board.forEach((sq) => (sq.style.pointerEvents = "none"));

// ====== Reset Game ======
const resetGame = () => {
  boardGame.fill("");
  isXTurn = true;
  movesCount = 0;
  gamePlay.textContent = "X turn";
  Board.forEach((sq) => {
    sq.style.pointerEvents = "all";
    sq.firstElementChild.textContent = "";
  });
};

// ====== Show Winner / Draw Alert ======
const showAlert = (winner) =>
  Swal.fire({
    title: winner ? `Congrats! ${winner} wins` : "Draw",
    showDenyButton: true,
    confirmButtonText: "Play Again",
    denyButtonText: "No, Thanks",
  }).then((res) =>
    res.isConfirmed
      ? resetGame() // Restart game if confirmed
      : res.isDenied && Swal.fire("Okay, take it easy!", "", "info")
  );

// ====== Reset Button Click ======
reset.addEventListener("click", resetGame);
