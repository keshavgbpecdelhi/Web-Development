const search = document.querySelector("#search");
const submit = document.querySelector("#submit");
const recent = document.querySelector("#recent");
const card = document.querySelector(".card");
const list = document.querySelector(".List");
const unorder = document.querySelector("#unordered");
const items = document.querySelector("#list_items");
submit.addEventListener("click",display);
search.addEventListener("input",validate);

let value = "";

  function display(){
    getData(value);
}

function validate(e){
    e.preventDefault();
   value = e.target.value;
  console.log(value);
    searchStates(value);
}

const getData = async function (users) {
    const res = await fetch(`https://api.github.com/users/${users}`);
    const info = await res.json();
    renderData(info);
  };

  const renderData = function (data) {
    const html = `
      <div class="git_data">
        <h3 class="git_name">Name : ${data.name}</h3>
        <h4 class="git_repo">Repositories : ${data.public_repos}</h4>
        <p class="git_url">Url : ${data.url}</p>
      </div>
      `;
      list.style.display = "none";
     card.innerHTML = html;
  };



const outputHtml = function (matches) {
    if (matches.length > 0) {
        list.style.display = "flex";
      const html = matches
        .map(
          (match) => `
          <li class = "list_items">${match.login}<li>
      `
        )
        .join("");

  
      unorder.innerHTML = html;
    }
  };

const searchStates = async (searchText) => {
    if (searchText.length == 0) {
        list.style.display = "none";
        return;
      }
    const res = await fetch(
      `https://api.github.com/search/users?q=${searchText}`
    );
    let users = await res.json();
    let matches;
    matches = users.items.filter((user) => {
      const regex = new RegExp(`^${searchText}`, "gi");
      return user.login.match(regex);
    });

    
    console.log(matches);
    outputHtml(matches);
  };


list.addEventListener("click",check);

function check(e){
    console.log(e.target.innerText);
     value = e.target.innerText;
     search.value = value;
     display();
}