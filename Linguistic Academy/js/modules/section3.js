export const About = async () => {
    const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
    const data = await fetch (url);
    const res = await data.json();
    const result = res;
    // console.log(result.aboutTeach);

    document.querySelector(".container3__h1").innerHTML = `
    ${result.aboutHeading}
    `
    document.querySelector(".container3__p0").innerHTML = `
    ${result.aboutParag0}
    `
    document.querySelector(".container3__p1").innerHTML = `
    ${result.aboutParag1}
    `
    document.querySelector(".container3__p2").innerHTML = `
    ${result.aboutLocation}
    `

    document.querySelector(".container3__btnBlock").innerHTML = `
    ${result.aboutBtn}
    `

    document.querySelector(".container3__right").innerHTML = `
    <div>
    <img class="container3__rightImg" src="${result.aboutImg}" alt ="teacher teaching">
    <p class="container3__rightp0">${result.aboutTeach}</p>
    </div>
    `
    ;
}