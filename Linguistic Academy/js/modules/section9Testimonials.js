export const Testimonials = async () => {
    try {
        const url = "https://alidhuniya.github.io/linguisticCenter/lang.json";
        const data = await fetch (url);
        const res = await data.json();
        const result = res;
        // console.log(result.testimonials[0].testimonialsProfileImg);
       
       document.querySelector(".container9__h1").innerHTML = `
       ${result.testimonialsHeading}
       `;
       document.querySelector(".container9__p0").innerHTML = `
       ${result.testimonialsDesc}
       `;
        // testimonial -1
       document.querySelector(".container9__quote1").innerHTML = `
       ${result.testimonials[0].testimonialsQuote}
       `;

       document.querySelector(".container9__img1").src=`${result.testimonials[0].testimonialsProfileImg}`;

       document.querySelector(".container9__author1").innerHTML = `
       ${result.testimonials[0].clientName}
       `;

       document.querySelector(".container9__status1").innerHTML=`
       ${result.testimonials[0].clientStatus}
       `;

          // testimonial -2
          document.querySelector(".container9__quote2").innerHTML = `
          ${result.testimonials[1].testimonialsQuote}
          `;
   
          document.querySelector(".container9__img2").src=`${result.testimonials[1].testimonialsProfileImg}`;
   
          document.querySelector(".container9__author2").innerHTML = `
          ${result.testimonials[1].clientName}
          `;
   
          document.querySelector(".container9__status2").innerHTML=`
          ${result.testimonials[1].clientStatus}
          `;

             // testimonial -3
             document.querySelector(".container9__quote").innerHTML = `
             ${result.testimonials[2].testimonialsQuote}
             `;
      
             document.querySelector(".container9__img").src=`${result.testimonials[2].testimonialsProfileImg}`;
      
             document.querySelector(".container9__author").innerHTML = `
             ${result.testimonials[2].clientName}
             `;
      
             document.querySelector(".container9__status").innerHTML=`
             ${result.testimonials[2].clientStatus}
             `;


    (function () {
        "use strict";
        var slides = document.querySelectorAll(".testimonial-item"),
            button = document.getElementById("button"),
            arrows = document.querySelectorAll(".testIcon"),
            carouselCount = 0,
            scrollInterval,
            interval = 7000;
    
        arrows[0].addEventListener("click", function (e) {
            e = e || window.event;
            e.preventDefault();
            carouselCount -= 100;
            slider();
            if (e.type !== "autoClick") {
                clearInterval(scrollInterval);
                scrollInterval = setInterval(autoScroll, interval);
            }
        });
        arrows[1].addEventListener("click", sliderEvent);
        arrows[1].addEventListener("autoClick", sliderEvent);
    
        function sliderEvent(e) {
            e = e || window.event;
            e.preventDefault();
            carouselCount += 100;
            slider();
            if (e.type !== "autoClick") {
                clearInterval(scrollInterval);
                scrollInterval = setInterval(autoScroll, interval);
            }
        }
    
        function slider() {
            switch (carouselCount) {
                case -100:
                    carouselCount = 0;
                    break;
                case 300:
                    carouselCount = 0;
                    break;
                default:
                    break;
            }
            // console.log(carouselCount);
            for (var i = 0; i < slides.length; i += 1) {
                slides[i].setAttribute(
                    "style",
                    "transform:translateX(-" + carouselCount + "%)"
                );
            }
        }
    
        // create new Event to dispatch click for auto scroll
        var autoClick = new Event("autoClick");
        function autoScroll() {
            arrows[1].dispatchEvent(autoClick);
        }
    
        // set timing of dispatch click events
        scrollInterval = setInterval(autoScroll, interval);
    })();
    
       

    }


    catch(error) {
        console.log("Failed", error);
    }
}

