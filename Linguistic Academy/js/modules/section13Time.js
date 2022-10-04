export const Time = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.scheduleList[0].heading)

        document.querySelector(".container13__h1").innerHTML = `
        ${result.scheduleHeading}
        `;
        
       
        
        let output = '';

for (var i in result.scheduleList) {
    output += `
    <div class="container13__scheduleList">

    <div>
    <h3 class="container13__h3">${result.scheduleList[i].heading}</h3>
    </div>

    <div>
    <p class="container13__p0">${result.scheduleList[i].desc}</p>
    </div>

    <div>
    <p class="container13__p">${result.scheduleList[i].weeks[0].week0}</p>
    </div>

    <div>
    <p class="container13__p">${result.scheduleList[i].weeks[1].week1}</p>
    </div>

    <div>
    <p class="container13__p">${result.scheduleList[i].weeks[2].week2}</p>
    </div>

    <div>
    <p class="container13__p">${result.scheduleList[i].weeks[3].week3}</p>
    </div>

    <div>
    <h4 class="container13__h4">${result.scheduleList[i].lessonPerWeek}</h4>
    </div>

    
    <div class="container13__btn">
    <button class="container13__btnBlock">${result.scheduleList[i].btn}</button>
    </div>

    </div>
    `;
}
 const Timing = document.querySelector(".container13__schedule").innerHTML = output;
      
    }


    catch(error) {
        console.log("Failed", error);
    }
}



