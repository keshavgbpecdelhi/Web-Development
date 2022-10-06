var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

function nextSequence(){

   userClickedPattern = [];
   level++;
   $("#level-title").text("Level " + level);
    
   var randomNumber = Math.floor(Math.random() * 3);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);

}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);   
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function playSound(name){
    var soundToBePlayed = new Audio("sounds/" + name + ".mp3");
    soundToBePlayed.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout( function(){
    $("#" + currentColour).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
  




