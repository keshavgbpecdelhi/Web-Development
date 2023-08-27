const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const boardContainer = document.querySelector(".board");

function display() {
  let elem = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col] === 0) {
        boardContainer.children[elem].style.color = "";
        boardContainer.children[elem].innerText = "";
        boardContainer.children[elem].style.backgroundColor = "";
        elem++;
      } else {
        if (board[row][col] >= 128) {
          boardContainer.children[elem].style.color = "white";
        }
        boardContainer.children[elem].innerText = board[row][col];
        boardContainer.children[elem].style.backgroundColor = changeColor(
          row,
          col
        );
        elem++;
      }
    }
  }
}

function gameOver() {
    document.querySelector('.game-end').classList.add('active');
}

function assignRandom() {
  let row = Math.floor(Math.random() * 4);
  let col = Math.floor(Math.random() * 4);
  if (board[row][col] == 0) {
    let chance = Math.random();
    if (chance > 0.9) board[row][col] = 4;
    else board[row][col] = 2;
  } else {
    try {
      assignRandom();
    } catch {
      gameOver();
    }
  }
}

// 2048 logic
function move(row, col, rowInc, colInc) {
  let nextRow = row + rowInc;
  let nextCol = col + colInc;
  if (nextRow < 0 || nextRow > 3 || nextCol < 0 || nextCol > 3) {
    return;
  }
  if (board[nextRow][nextCol] === 0) {
    board[nextRow][nextCol] = board[row][col];
    board[row][col] = 0;
    move(nextRow, nextCol, rowInc, colInc);
  } else if (board[nextRow][nextCol] === board[row][col]) {
    board[nextRow][nextCol] *= 2;
    board[row][col] = 0;
  }
}

function moveUp() {
  for (let col = 0; col < 4; col++) {
    for (let row = 1; row < 4; row++) {
      if (board[row][col] !== 0) {
        move(row, col, -1, 0);
      }
    }
  }
}

function moveDown() {
  for (let col = 0; col < 4; col++) {
    for (let row = 2; row >= 0; row--) {
      if (board[row][col] !== 0) {
        move(row, col, 1, 0);
      }
    }
  }
}

function moveLeft() {
  for (let row = 0; row < 4; row++) {
    for (let col = 1; col < 4; col++) {
      if (board[row][col] !== 0) {
        move(row, col, 0, -1);
      }
    }
  }
}

function moveRight() {
  for (let row = 0; row < 4; row++) {
    for (let col = 2; col >= 0; col--) {
      if (board[row][col] !== 0) {
        move(row, col, 0, 1);
      }
    }
  }
}

function updateScore() {
    let score = 0;
    board.forEach(row => {
        row.forEach(col => {
            score += col;
        })
    })
    document.querySelector('#score').innerText = score;
}

// event listeners
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    default:
      return;
  }

  updateScore();
  assignRandom();
  display();
});

// when click game-end button
document.querySelector('#game-end-button').addEventListener('click', () => {
    // reload the page
    location.reload();
})

function changeColor(row, col) {
  let value = board[row][col];
  return `hsla(220, ${(100 / 12) * Math.log2(value)}%, ${
    100 - Math.log2(value) * 12
  }%,${100 - Math.log2(value) / 12}%)`;
}

assignRandom();
assignRandom();
display();
