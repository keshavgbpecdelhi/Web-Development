
//creating random number
var randomNumber1 = (Math.floor(Math.random() * 6)) + 1;


//changing the <img> to a random dice

var randomdiceimage = "dice" + randomNumber1 + ".png";
var randomImagesource1 = "images/" + randomdiceimage;


var img1 = document.querySelectorAll("img")[0];

img1.setAttribute("src", randomImagesource1);

var randomNumber2 = (Math.floor(Math.random()* 6) + 1);
var randomImagesource2 = "images/" + "dice"+ randomNumber2 + ".png";

document.querySelectorAll("img")[1].setAttribute("src", randomImagesource2);

//changing the title to declare the winner.

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "🚩Player 1 Wins!!!";
}
else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "🚩 Player 2 Wins!!!";
}
else {
    document.querySelector("h1").innerHTML = "It's a Draw. Play Again!";
}
