export const Team = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.instructorHeading);
       
        document.querySelector(".container8__h1").innerHTML = `
        ${result.instructorHeading}
        `;
        document.querySelector(".container8__p0").innerHTML = `
        ${result.instructorDesc}
        `;

        let output = '';

        for (var i in result.instructorProfiles) {
            output += `
          <div class="container8__profile">
            <img class="container8__img" src="${result.instructorProfiles[i].img}" alt = "profile">
            <h4 class="container8__h4"> ${result.instructorProfiles[i].name}</h4>
            <p class="container8__p1">${result.instructorProfiles[i].title}</p>
          </div>
            `
        }
        const langList = document.querySelector(".container8__team").innerHTML = output;
        

    }


    catch(error) {
        console.log("Failed", error);
    }
}