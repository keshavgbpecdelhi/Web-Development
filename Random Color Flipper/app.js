var btn=document.getElementById("btn")
var resetbtn=document.getElementById("btn-reset")
var hexu=document.getElementById("hex")
var bgc=document.getElementById("bgc")
var bgcol, fgcol
const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

btn.addEventListener('click', function(){
    let hexcol = "#"
    for(var hue=0; hue<6;++hue)
        hexcol+=colors[randomize()]
    
    document.body.style.backgroundColor=hexcol
    console.log(hexcol)
    hexu.textContent=hexcol
    bgcol="rgb(49, 49, 49)"
    fgcol="#f7f7f7"
    swithcol(bgcol, fgcol)
})

resetbtn.addEventListener("click", function(){
    bgcol="#f7f7f7"
    fgcol="rgb(49, 49, 49)"
    swithcol(bgcol, fgcol)
    document.body.style.backgroundColor="#1a2941"
    hexu.textContent="#1a2941"
})

function randomize(){
    return Math.floor(Math.random()*colors.length)
}

function swithcol(bgcol, fgcol){
    bgc.style.backgroundColor=bgcol
    bgc.style.color=fgcol
    btn.style.backgroundColor=bgcol
    btn.style.color=fgcol
    resetbtn.style.backgroundColor=bgcol
    resetbtn.style.color=fgcol
}