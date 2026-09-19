var num = Math.floor(Math.random()*6) + 1;
document.querySelector(".img1").setAttribute("src", "images/dice" + num + ".png");

var num2 = Math.floor(Math.random()*6) + 1;
document.querySelector(".img2").setAttribute("src", "images/dice" + num2 + ".png");

if (num2>num) document.querySelector("h1").innerHTML = "Player 2 Wins!";
else if (num2<num) document.querySelector("h1").innerHTML = "Player 1 Wins!";
else document.querySelector("h1").innerHTML = "Draw!";