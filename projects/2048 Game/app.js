const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
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
                } else {
                    boardContainer.children[elem].style.color = "#111";
                }
                boardContainer.children[elem].innerText = board[row][col];
                boardContainer.children[elem].style.backgroundColor = changeColor(row, col);
                elem++;
            }
        }
    }
}

function slide(row) {
    let arr = row.filter(val => val !== 0);
    while (arr.length < 4) {
        arr.push(0);
    }
    return arr;
}

function combine(row) {
    for (let i = 0; i < 3; i++) {
        if (row[i] !== 0 && row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
        }
    }
    return row;
}

function moveRowLeft(row) {
    let s = slide(row);
    let c = combine(s);
    return slide(c);
}

function moveLeft() {
    let changed = false;
    for (let r = 0; r < 4; r++) {
        let oldRow = [...board[r]];
        board[r] = moveRowLeft(board[r]);
        if (oldRow.some((val, idx) => val !== board[r][idx])) {
            changed = true;
        }
    }
    return changed;
}

function moveRight() {
    let changed = false;
    for (let r = 0; r < 4; r++) {
        let oldRow = [...board[r]];
        let reversed = [...board[r]].reverse();
        reversed = moveRowLeft(reversed);
        board[r] = reversed.reverse();
        if (oldRow.some((val, idx) => val !== board[r][idx])) {
            changed = true;
        }
    }
    return changed;
}

function moveUp() {
    let changed = false;
    for (let c = 0; c < 4; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let newCol = moveRowLeft(col);
        for (let r = 0; r < 4; r++) {
            if (board[r][c] !== newCol[r]) {
                changed = true;
            }
            board[r][c] = newCol[r];
        }
    }
    return changed;
}

function moveDown() {
    let changed = false;
    for (let c = 0; c < 4; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        let reversed = col.reverse();
        let newCol = moveRowLeft(reversed).reverse();
        for (let r = 0; r < 4; r++) {
            if (board[r][c] !== newCol[r]) {
                changed = true;
            }
            board[r][c] = newCol[r];
        }
    }
    return changed;
}

function assignRandom() {
    let emptyCells = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] === 0) {
                emptyCells.push({ r, c });
            }
        }
    }
    if (emptyCells.length === 0) return false;
    let chosen = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[chosen.r][chosen.c] = Math.random() > 0.9 ? 4 : 2;
    return true;
}

window.addEventListener('keydown', (e) => {
    let moved = false;
    switch (e.key) {
        case "ArrowUp":
            e.preventDefault();
            moved = moveUp();
            break;
        case "ArrowDown":
            e.preventDefault();
            moved = moveDown();
            break;
        case "ArrowLeft":
            e.preventDefault();
            moved = moveLeft();
            break;
        case "ArrowRight":
            e.preventDefault();
            moved = moveRight();
            break;
        default:
            return;
    }
    if (moved) {
        assignRandom();
        display();
    }
});

function changeColor(row, col) {
    let value = board[row][col];
    return `hsla(220, ${(100 / 12) * (Math.log2(value))}%, ${100 - Math.log2(value) * 12}%, ${100 - Math.log2(value) / 12}%)`;
}

assignRandom();
assignRandom();
display();
