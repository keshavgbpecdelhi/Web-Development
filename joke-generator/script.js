const jokeArea = document.querySelector("#joke-area");
const jokeButton = document.querySelector("#joke-button");
const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,racist,sexist,explicit";

jokeButton.addEventListener("click", (e) => {
  jokeArea.classList.add("loading");
  loadingTimeout();
  generateJokes();
});

async function generateJokes() {
  const res = await fetch(url);
  const data = await res.json();
  jokeArea.innerText = "";
  let joke = "";
  if (data.joke == undefined) {
    joke = `${data.setup} ${data.delivery}`;
  } else {
    joke = data.joke;
  }
  jokeArea.innerText = joke;
}

function loadingTimeout() {
  setTimeout(() => {
    jokeArea.classList.remove("loading");
    joke.style.color = "black";
    jokeArea.style.color = "transparent";
  }, 3000);
}
