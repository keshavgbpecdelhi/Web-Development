// var start = 97,
//     end = 122,
//     button;

// while (start <= end) {
//     button = document.createElement("button");
//     button.id = button.textContent = String.fromCharCode(start);
//     document.body.appendChild(button);
//     start += 1;
// }

// document.addEventListener("keypress", function onKeypress(evt) {
//     var element = document.getElementById(String.fromCharCode(evt.charCode || evt.char));
//     console.log(element);

//     if (element) {
//         document.addEventListener("keyup", function onKeyup() {
//             document.removeEventListener("keyup", onKeyup);

//             element.style.backgroundColor = "yellow";
//         }, false);

//         element.style.backgroundColor = "#004f40";
//     }
// }, false);

window.addEventListener('keydown', v => {
    console.log(v.key);
    if(v.key == 'a'){
        document.body.style.background = "#080808";
    }
})