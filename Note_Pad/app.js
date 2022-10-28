shownotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (elemen) {
  let text = document.getElementById("addTxt");
  let note = localStorage.getItem("note");
  if (note == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(note);
  }
  notesObj.push(text.value);
  localStorage.setItem("note", JSON.stringify(notesObj));
  text.value = "";
  shownotes();
});
function shownotes() {
  let note = localStorage.getItem("note");
  if (note == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(note);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="new card mx-2 my-3" style="width: 18rem">
    <div class="card-body">
    <h5 class="card-title">note ${index + 1}</h5>
    <p class="card-text">${element}</p>
    <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete note</button>
    </div>
    </div>
    </div>`;
  });
  let display = document.getElementById("notes");
  if (notesObj.length != 0) {
    display.innerHTML = html;
  } else {
    display.innerHTML = `<h4>No notes present at this moment</h4>`;
  }
}
function deleteNode(id) {
  let note = localStorage.getItem("note");
  if (note == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(note);
  }
  notesObj.splice(id, 1);
  localStorage.setItem("note", JSON.stringify(notesObj));
  shownotes();
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  let inputValue = search.value.toLowerCase();
  let cards = document.getElementsByClassName("new");
  Array.from(cards).forEach(function (element) {
    let textOfCard = element.getElementsByTagName("p")[0];
    if (textOfCard.innerText.includes(inputValue)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
