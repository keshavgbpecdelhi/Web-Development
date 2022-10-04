export const Test = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.testHeading)

      document.querySelector(".container5__h1").innerHTML = `${result.testHeading}`
      document.querySelector(".container5__p0").innerHTML = `${result.testDesc}`
      document.querySelector(".container5__btnBlock").innerHTML = `${result.testBtn}`
      
    }


    catch(error) {
        console.log("Failed", error);
    }
}