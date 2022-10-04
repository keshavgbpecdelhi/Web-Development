export const Courses = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.tourImg)

        document.querySelector(".container12__h1").innerHTML = `
        ${result.coursesHeading}
        `;
        document.querySelector(".container12__p0").innerHTML = `
        ${result.coursesDes}
        `;
       
        
        let output = '';

for (var i in result.coursesList) {
    output += `
   <div class="container12__course">

   <img src="${result.coursesList[i].img}" alt="" class="container12__img">
   <div class="container12__contents">
    <div class="container12__contentsList">
   <h3 class="container12__h3">${result.coursesList[i].price}</h3>
   <p class="container12__p">${result.coursesList[i].heading}</p>
   <div class="container12__btn">
    <button class="container12__btnBlock">${result.coursesList[i].btn}</button>
   </div>

   </div>

   </div>

    </div>
    `;
}
const courses = document.querySelector(".container12__coursesSection").innerHTML = output;
      
    }


    catch(error) {
        console.log("Failed", error);
    }
}



