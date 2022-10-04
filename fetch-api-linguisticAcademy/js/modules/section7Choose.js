export const Choose = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.chooseHeading);
        document.querySelector(".container7__h1").innerHTML = `
        ${result.chooseHeading}
        `;

        document.querySelector(".container7__p0").innerHTML = `
        ${result.chooseDes}
        `;

        let output = '';

        for (var i in result.choose) {
            output += `
           <div class="container7__row">

           
            <div class="container7__lists">

            <div class="container7__img">
            <img class="container7__imgIcon" src="${result.choose[i].iconImg}" alt="">
            </div>

            <div class="container7__contents">
            <h3 class="container7__h3"> ${result.choose[i].heading} </h3>
            <p class="container7__p1">${result.choose[i].desc}</p>
            </div>

            </div>
          

           </div>
            `
        }
        const langList = document.querySelector(".container7__choose").innerHTML = output;
        
       

    }


    catch(error) {
        console.log("Failed", error);
    }
}