// topBar

export const topBar = async () => {
  const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
  const data = await fetch(url);
  const res = await data.json();
  const result = res;
  // console.log(result.topNav);
  document.querySelector(".header__h4").innerHTML = ` ${result.topNav}`;

  setTimeout(function () {
    document.getElementById("hide").style.display = "none";
  }, 7000);
};
