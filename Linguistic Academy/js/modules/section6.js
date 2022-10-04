export const Wlcm = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.welcomeList);

        document.querySelector(".container6__h1").innerHTML = `${result.folksHeading}`;
        document.querySelector(".container6__p0").innerHTML = ` ${result.folksDesc}`;

        let output = '';

for (var i in result.welcomeList) {
    output += `
   <div class="container6__wlcmFeature">
   <div class="container6__img"> <img class="container6__iconSize" src="${result.welcomeList[i].iconImg}" alt=""> </div>
   <div><h3 class="container6__h3">${result.welcomeList[i].heading}</h3></div>
   <div><p class="container6__p1">${result.welcomeList[i].desc}</p></div>
   </div>
    `
}
const langList = document.querySelector(".container6__wlcmList").innerHTML = output;

    }


    catch(error) {
        console.log("Failed", error);
    }
}