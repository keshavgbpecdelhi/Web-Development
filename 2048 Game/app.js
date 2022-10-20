const board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // const board = [
    //     [0, 2, 4, 8],
    //     [16, 32, 64, 128],
    //     [256, 512, 1024, 0],
    //     [0, 0, 0, 0]
    // ]
const boardContainer = document.querySelector(".board");
document.addEventListener('swiped-up', function(e) {
    console.log(e.target); // the element that was swiped
});

function display() {
    let elem = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                boardContainer.children[elem].style.color = "";
                boardContainer.children[elem].innerText = "";
                boardContainer.children[elem].style.backgroundColor = "";
                elem++
            } else {
                if (board[row][col] >= 128) {
                    boardContainer.children[elem].style.color = "white";
                }
                boardContainer.children[elem].innerText = board[row][col];
                boardContainer.children[elem].style.backgroundColor = changeColor(row, col);
                elem++
            }
        }
    }
}

function assignRandom() {
    let row = Math.floor(Math.random() * 4)
    let col = Math.floor(Math.random() * 4)
    if (board[row][col] == 0) {
        let chance = Math.random();
        if (chance > 0.9)
            board[row][col] = 4;
        else board[row][col] = 2;
    } else {
        try {
            assignRandom();
        } catch {
            console.log("game over");
        }
    }
}
window.addEventListener('keyup', (e) => {
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
            return
    }
    display()
    assignRandom()
    display()
})

function changeColor(row, col) {
    let value = board[row][col];
    return `hsla(220, ${(100/12)*(Math.log2(value))}%, ${100-Math.log2(value)*12}%,${100-Math.log2(value)/12}%)`;
}
assignRandom()
assignRandom()
display()