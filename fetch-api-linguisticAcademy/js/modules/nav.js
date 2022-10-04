/*
@Anurag Hazra  so you mean, I should leave like that
@alidhuniya yeah thats totally fine.. even if you modularize it will be just one line shorter.
*/
// const fetcher = async = (url) => {
//     const res = await fetch(url);
//     return await res.json();
//  }
 
//  fetcher('https://jsonplaceholder.typicode.com/todos/1').then(data => {
//     console.log(data)
//  })



export const navBar = async () => {
    try {
    const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
    const data = await fetch (url);
    const res = await data.json();
    const result = res;
    // console.log(result.navBar);

    document.querySelector(".header__logoSection").innerHTML = ` 
   <div class="header__logo"> 
    <div>
    <img class="header__logoImg" src="${result.navBar[0].logoImg}" alt=""> 
    </div>
   </div> 
    `;
 
    document.querySelector(".header__h1").innerHTML = ` ${result.navBar[0].logoHeading} `;

    let output = '';

    for (let i in result.navBar[1][0]) {
        output += `
        <li  class="header__navLi "><a  class="header__hrf header__navLIColor" href="#home">${result.navBar[1][0].home}</a></li>
        <li  class="header__navLi"><a  class="header__hrf" href="#about">${result.navBar[1][1].about}</a></li>
        <li  class="header__navLi"><a  class="header__hrf" href="#whyUs">${result.navBar[1][2].whyUs}</a></li>
        <li  class="header__navLi"><a  class="header__hrf" href="#programs">${result.navBar[1][3].programs}</a></li>
        <li  class="header__navLi"><a  class="header__hrf" href="#upcoming">${result.navBar[1][4].upcoming}</a></li>
        <li  class="header__navLi"><a  class="header__hrf" href="#schedule">${result.navBar[1][5].schedule}</a></li>
        <li  class="header__navLi"><a  class="header__hrf" href="#contact">${result.navBar[1][6].contact}</a></li>
        <li  class="header__navLi header__navBtn"><a  class="header__hrfBtn" href="#footer">${result.navBar[1][7].phoneNumber}</a></li>
        `
    }

    document.querySelector(".header__rightNav").innerHTML = output;

     // hambergur menu

    // Selection of HTML objects
    const burger = document.querySelector('.icon');
    const nav = document.querySelector('.header__rightNav');
    
    // Defining a function
    function toggleNav() {
        burger.classList.toggle('fa-bars');
        burger.classList.toggle('fa-times');
        nav.classList.toggle('nav-active');
    }
    
    // Calling the function after click event occurs


    if(burger){
        burger.addEventListener('click', toggleNav, false);
      }
   
}

catch (error) {
    console.log("failed", error);
}
    
}

