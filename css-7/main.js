const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close")

      /* ----show menu-------*/

      if(navToggle)
      {
          navToggle.addEventListener('click' , () => {
              navMenu.classList.add("show-menu")
          })
      }

        //  hide the menu

        if(navClose)
      {
          navClose.addEventListener('click' , () => {
              navMenu.classList.remove("show-menu")
          })
      }

    //   remove menu mobile 
      const navLinks = document.querySelectorAll(".nav-link")

       function linkAction()
       {
           const navMenu = document.getElementById("nav-menu")
            //    to remove show menu after ckicking on nav-links
           navMenu.classList.remove("show-menu")
       }

       navLinks.forEach(n => n.addEventListener('click', linkAction))

    //    change background header 

    function scrollHeader()
    {
        const header = document.getElementById("header")
        //when the scroll is greater than 80 viewport height,add the class scroll header to the tag header

        if(this.scrollY >= 80) header.classList.add("scroll-header"); else header.classList.remove("scroll-header")
    }

    window.addEventListener("scroll" , scrollHeader)
    
// scroll section active link 
    //  get all sections that have an id defined
         const sections = document.querySelectorAll("section[id]");
          
        //  add an event listener listening for scroll 
        window.addEventListener("scroll",navHighLighter); 

         function navHighLighter()
         {
            //    get current scroll function 
            let scrollY = window.pageYOffset;
            // now we loop through sections to get get height ,top and ID values for each
             sections.forEach(current => {
                 const sectionHeight = current.offsetHeight;
                 const sectionTop = current.offsetTop-50,
                 sectionId = current.getAttribute("id");


                 if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
                  {
                      document.querySelector('.nav-menu a[href*=' + sectionId +']').classList.add("active-link")
                  }
                  else{
                    document.querySelector('.nav-menu a[href*=' + sectionId +']').classList.remove("active-link")
                }
                })
        }


        //   get current scroll possition 
        let scrollY=window.page


    // portfolio item filter 

    const filterContainer = document.querySelector(".portfolio-filter-inner")
          filterBtns = filterContainer.children,
          totalFilterBtn= filterBtns.length,
          portfolioItems=document.querySelectorAll(".portfolio-item"),
          totalPortfolioItem=portfolioItems.length;

        for(let i=0; i<totalFilterBtn; i++)
        {
            filterBtns[i].addEventListener("click" ,function() 
            {
                filterContainer.querySelector(".active").classList.remove("active");
                this.classList.add("active");

                const filterValue = this.getAttribute("data-filter");
                 for(let k=0; k<totalPortfolioItem; k++)
                 {
                     if(filterValue===portfolioItems[k].getAttribute("data-category"))
                      {
                        portfolioItems[k].classList.remove("hide");
                          portfolioItems[k].classList.add("show");
                      }
                      else
                      {
                          portfolioItems[k].classList.add("hide");
                          portfolioItems[k].classList.remove("show");
                      }

                      if(filterValue === "all")
                        {
                            portfolioItems[k].classList.remove("hide");
                            portfolioItems[k].classList.add("show");
                        }

                    }
                
            })
        
        }
