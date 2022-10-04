
export const Footer = async () => {
  try {

    const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
    const data = await fetch (url);
    const res = await data.json();
    const result = res;
  // console.log(result.navBar[0].logoImg);

  document.querySelector(".header__footer-logoSection").innerHTML = `

   <div class="footer-header__logo">
   <img class="header__footer-logoImg" src="${result.navBar[0].logoImg}" alt=""> 
   </div>
   `;
   document.querySelector(".header__footer-h1").innerHTML = ` ${result.navBar[0].logoHeading} `;


   let output = '';

   for (let i in result.navBar[1][0]) {
       output += `
       <li class="header__navLi "><a class="header__hrf header__navLIColor" href="#home">${result.navBar[1][0].home}</a></li>
       <li class="header__navLi"><a class="header__hrf" href="#about">${result.navBar[1][1].about}</a></li>
       <li class="header__navLi"><a class="header__hrf" href="#whyUs">${result.navBar[1][2].whyUs}</a></li>
       <li class="header__navLi"><a class="header__hrf" href="#programs">${result.navBar[1][3].programs}</a></li>
       <li class="header__navLi"><a class="header__hrf" href="#upcoming">${result.navBar[1][4].upcoming}</a></li>
       <li class="header__navLi"><a class="header__hrf" href="#schedule">${result.navBar[1][5].schedule}</a></li>
       <li class="header__navLi"><a class="header__hrf" href="#contact">${result.navBar[1][6].contact}</a></li>
       <li class="header__navLi header__navBtn"><a class="header__hrfBtn" href="#footer">${result.navBar[1][7].phoneNumber}</a></li>
       `
   }

   document.querySelector(".header__footer-rightNav").innerHTML = output;


   let output1 = '';

   for (let j in result.footerIcons) {
       output1 += `
      <img class="footer__socialIcons" src="${result.footerIcons[j].icon}" />
       `
   }

   document.querySelector(".footer__icons").innerHTML = output1;

  
  }
  catch(error) {
    console.log("Failed", error);
  }
}
