export const Section1 = async () => {
    const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
    const data = await fetch (url);
    const res = await data.json();
    const result = res;
    // console.log(result.mainContainerImg);
const img = `${result.mainContainerImg}`;
// console.log(img);
    let bgr = document.querySelector(".container__womenImage").style.backgroundImage = `url(${img})`; 

    
    document.querySelector(".container__h1").innerHTML = `${result.containerHeading}`;
    document.querySelector(".container__btn").innerHTML = `${result.containerBtn}`;

}