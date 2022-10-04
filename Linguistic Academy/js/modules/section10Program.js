export const Programs = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
       // console.log(result.programsList);
        document.querySelector(".container10__h1").innerHTML = `
        ${result.programsHeading}
        `;
        document.querySelector(".container10__p0").innerHTML = `
        ${result.programsDesc}
        `;

        
        let output = '';

for (var i in result.programsList) {
    output += `
    <div class="container10__listSection">

    <div class="container10__thumb">
    <h2 class="container10__h2">${result.programsList[i].heading}</h2>
    </div>

    <div class="container10__desc">
    <p class="container10__p">${result.programsList[i].desc}</p>
    </div>

    <div class="container10__btn">
    <button class="container10__btnBlock">${result.programsList[i].btn}</button>
    </div>

    </div>
    `
}
const programsSection = document.querySelector(".container10__programContents").innerHTML = output;

    }

    catch(error) {
        console.log("Failed", error);
    }

}