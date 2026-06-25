const keyDisplay = document.getElementById("keyDisplay");

function randomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

window.addEventListener("keydown", (event) => {
    document.body.style.backgroundColor = randomColor();
    keyDisplay.textContent = `Key Pressed: ${event.key}`;
});