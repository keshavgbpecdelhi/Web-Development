export const Professionals = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.tourImg)

        const bgImgURL = `${result.professionalsImg}`
        
        const bgImg = document.querySelector(".container11__img").style.backgroundImage = `url(${bgImgURL})`;

        document.querySelector(".container11__h1").innerHTML = `${result.professionalsHeading}`;

        document.querySelector(".container11__h4").innerHTML = `${result.professionalsDesc}`;

       document.querySelector(".container11__btnBlock").innerHTML = ` ${result.professionalsBtn}`;
       
      
    }


    catch(error) {
        console.log("Failed", error);
    }
}



