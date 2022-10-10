
const body = document.querySelector("body");
const toggle = document.querySelector(".toggle");
const copy = document.querySelector("#copy_joke");
const popup=document.querySelector(".copy-popup");

const jokeContainer = document.getElementById("joke");


const btn = document.getElementById("btn");
const url = "https://icanhazdadjoke.com/slack";

let getJoke = () => {
  jokeContainer.classList.remove("fade");

    fetch(url)
    .then((response) => response.json())
    .then((user) => {
      let j = user.attachments[0].text;
      // console.log(user.attachments[0].text);
      jokeContainer.textContent = j;
      jokeContainer.classList.add("fade");
    }).catch((error) => {
      // jokeContainer.textContent = error.message;
      // * check if browser is online or not
      if(!window.navigator.onLine){
        jokeContainer.textContent = "Error: Your browser is offline. \nPlease try again with internet connection.";
      }else{
        jokeContainer.textContent = "Some Error Occurred: "+ error + ".\n Please try again";
        jokeContainer.classList.add("fade");
      }
    });    

}
// * whenever user gets online again, dont show him/her the user offline error, instead show him joke
  window.addEventListener('online', () => {
    // ! check if there's no error happening before browser becomes online again, only in that case getJoke, else remain joke as it is
    // if(jokeContainer.textContent != regex(/^Some\sError\sOccurred\W/)){getJoke()};
    getJoke()
  });

btn.addEventListener("click", getJoke);
getJoke();

// Fade in 
setTimeout(function () {
  jokeContainer.innerHTML = "Get Some Joke"
  jokeContainer.style.opacity = 1;
}, 500);



toggle.addEventListener("click", () => {
  body.classList.toggle("dark")
    ? (toggle.firstElementChild.className = "far fa-sun")
    : (toggle.firstElementChild.className = "far fa-moon");
});


copy.addEventListener("click", () => {
  const text = jokeContainer.textContent;
  navigator.clipboard.writeText(text);
  popup.classList.add("fade-in-image");
  setTimeout(function() {
    popup.classList.remove("fade-in-image");
  },3000);
  copy.querySelector("i").className = "fa-solid fa-check"
  setTimeout(function () {
    copy.querySelector("i").className = "fa-regular fa-copy"
  }, 1000);
});
