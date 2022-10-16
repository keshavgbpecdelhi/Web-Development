const cards = document.querySelectorAll(".card")
console.log(cards);

//variables
var isFlipped = false;
var firstCard;
var secondCard;

cards.forEach((card) => card.addEventListener("click", flip))

function flip() {
  // console.log("card flipped");
  // console.log(this);

  this.classList.add("flip");
  if (!isFlipped) {
     isFlipped = true;
     firstCard = this;
  } else {
    secondCard = this;
    console.log(firstCard);
    console.log(secondCard);
    checkIt();
  }
}
 
function checkIt() {
if (firstCard.dataset.image === secondCard.dataset.image){
  success()
}else(
  fail()
)
};

var success = () => {
 
   firstCard.removeEventListener('click',File);
  secondCard.removeEventListener('click',File);
   reset()

}
 var fail =() => {
setTimeout( () => {
  firstCard.classList.remove("flip");
  secondCard.classList.remove("flip");
   reset()
}, 1000)
}
var reset = () => {
   isFlipped = false;
   firstCard = null;
   secondCard = null;

}
(function shuffle() {
  cards.forEach((card) => {
    var index = Math.floor(Math.random()* 16);
      card.style.order = index;
  });
})();
