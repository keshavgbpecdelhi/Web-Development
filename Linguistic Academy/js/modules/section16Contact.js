export const Contact = async () => {
  try {
    const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
    const data = await fetch(url);
    const res = await data.json();
    const result = res;
    // console.log(result.scheduleList[0].heading)

    document.querySelector(".container16__h1").innerHTML = `
        ${result.contactHeading}
        `;

    document.querySelector(".container16__img").src = `
        ${result.emailIcon}
        `;

    document.querySelector(".container16__btnBlock").innerHTML = `
        ${result.emailBtn}
        `;

    document
      .querySelector(".container16__btn")
      .addEventListener("click", () => {
        location.href = "mailto: alidhuniya@gmail.com";
      });
  } catch (error) {
    console.log("Failed", error);
  }
};
