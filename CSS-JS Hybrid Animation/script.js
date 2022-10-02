let wingsImg = document.querySelector(".wings");
container.onmouseover = container.onmouseout = handler;

function handler(event) {

  if (event.type == 'mouseover') {
    wingsImg.style.animationDuration = `1s`;
    wingsImg.style.animationPlayState = `running`;
  }
  if (event.type == 'mouseout') {
    wingsImg.classList.add("stop");
    wingsImg.style.animationPlayState = `paused`;
  }
}
