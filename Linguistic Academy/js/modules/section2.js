export const langList = async () => {
  const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
  const data = await fetch (url);
  const res = await data.json();
  const result = res;
    // console.log(result.languages);

  const heading = document.querySelector(".container2__h3").innerHTML = `${result.chooseLangHeading}`;


let output = '';

for (var i in result.languages) {
  output += `
  <div class="container2__langSection">
       <img class="container2__img" src="${result.languages[i].flagImg}" alt = "flag">
    <h4 class="container2__h4">${result.languages[i].flagHeading}</h4>
       </div>
  `
}
const langList = document.querySelector(".container2__langList").innerHTML = output;

}