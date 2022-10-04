export const Trust = async () => {
  try {
    const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
    const data = await fetch(url);
    const res = await data.json();
    const result = res;
    // console.log(result.scheduleList[0].heading)

    document.querySelector(".container14__h1").innerHTML = `
        ${result.trustedHeading}
        `;

    let output = "";

    for (var i in result.trustedPartners) {
      output += `
            
           <img class="container14__imgs" src="${result.trustedPartners[i].img}" alt="trustedPartners">
            `;
    }
    const courses = (document.querySelector(
      ".container14__companies"
    ).innerHTML = output);
  } catch (error) {
    console.log("Failed", error);
  }
};
