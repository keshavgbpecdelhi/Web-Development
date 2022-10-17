let audioTurn = new Audio("bing.mpeg");

const heading = document.getElementById("Heading")
const bar = document.getElementById("bar")
const autoBtn = document.getElementById("button-3")
const changeBtn = document.getElementById("button-1")

// changeBtn.addEventListener("click",colorChange())

var set = false;
var mytimer
document.getElementById("button-1").onclick = function () {
   changeColor()

}

function changeColor() {
    let r, g, b, appleColor;
    r = Math.round(Math.random() * 256);
    g = Math.round(Math.random() * 256);
    b = Math.round(Math.random() * 256);
    appleColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    document.getElementById("Color").style.backgroundColor 
    = appleColor;
    document.getElementById("color-text").innerHTML=
    appleColor;
    bar.style.backgroundColor = appleColor
    audioTurn.play();
}

autoBtn.addEventListener("click",()=>{
    bar.classList.add('active');
    if(set===false){
    mytimer = setInterval(changeColor,7000);
    set=true;
    }

})


document.getElementById("button-2").onclick = 
function(){
    audioTurn.play();
    let color="white";
    document.getElementById("Color").style.backgroundColor
    =color;
    document.getElementById("color-text").innerHTML=
    "White";
    bar.style.backgroundColor = `white`
    heading.style.color = `white`
    bar.classList.remove('active')
    clearInterval(mytimer)
    set = false
}

