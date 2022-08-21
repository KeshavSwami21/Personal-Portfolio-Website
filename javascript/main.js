// -------------------------------- Preloader Starts -------------------------
(() => {
  window.addEventListener("load", () => {
    // Preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
    }, 600);
  });
})();

// -------------------------------- Preloader Ends -------------------------

// -------------------------------- Navigation Menu Starts -------------------------

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }
  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 300);
  }
  // Attaching an event handler to document
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("link-item")) {
      // Making sure that event.target.hash has a value before overriding default behaviour
      if (event.target.hash !== "") {
        // Preventing defualt anchor click behaviour
        event.preventDefault();
        const hash = event.target.hash;
        // Deactivating existing active section
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // Activating new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // Deactivating existing active navigation menu link-item
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");
        // If clicked 'link-item is contained within the navigation'
        if (navMenu.classList.contains("open")) {
          // Activating new navigation menu link-item
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");
          // hiding Navigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // Activating New navigation Menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }
        // Adding Hash (#) to url
        window.location.hash = hash;
      }
    }
  });
})();
// -------------------------------- Navigation Menu Ends -------------------------

// -------------------------------- About Section Tabs Starts -------------------------

(() => {
  const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (event) => {
    //   if event.target contains 'tab-item' class and not contains 'active' class
    if (
      event.target.classList.contains("tab-item") &&
      !event.target.classList.contains("active")
    ) {
      const target = event.target.getAttribute("data-target");
      //   deactivate existing active 'tab-item'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activate new 'tab-item'
      event.target.classList.add("active", "outer-shadow");
      //   deactivate existing active 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // activate new 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

// -------------------------------- About Section Tabs Ends -------------------------

// -------------------------------- Other Function Starts -------------------------

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

// -------------------------------- Other Function Ends ---------------------------

// --------------------------- Portfolio Filter Popup Starts ------------------------

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDeatilsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenshots;

  // Filter Portfolio Items
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // deactivate existing active 'filter-item'
      filterContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      event.target.classList.add("active", "outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(
        ".portfolio-item-inner"
      ).parentElement;
      // getting the portfolioItem index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // console.log(screenshots);
      // Converting Screenshots into array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", () => {
    popupToggle();
    if (projectDeatilsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }
  function popupSlideshow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    // Activating loader until the popup loads
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    // Deactivating loader until the popup loaded
    popupImg.onload = () => {
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  // Next Slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
    // console.log("slideIndex:" + slideIndex);
  });

  // Previous Slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideshow();
    // console.log("slideIndex:" + slideIndex);
  });

  function popupDetails() {
    // If portfolio-item-details not exists
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return; // end function execution
    }
    projectDetailsBtn.style.display = "block";
    // Getting the project details
    (".portfolio-item-details");
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    // Setting the porject details
    popup.querySelector(".pp-project-details").innerHTML = details;
    // Getting the project title
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    // Setting the project title
    popup.querySelector(".pp-title h2").innerHTML = title;
    // Getting the project category
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    // Setting the project category
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  });

  // Project Details Open and Close
  function popupDetailsToggle() {
    if (projectDeatilsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDeatilsContainer.classList.remove("active");
      projectDeatilsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDeatilsContainer.classList.add("active");
      projectDeatilsContainer.style.maxHeight =
        projectDeatilsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDeatilsContainer.offsetTop);
    }
  }
})();

// --------------------------- Portfolio Filter Popup Ends ------------------------

// --------------------------- Testimonial Slider Starts ------------------------

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item");
  slideWidth = sliderContainer.offsetWidth;
  (prevBtn = document.querySelector(".testi-slider-nav .prev")),
    (nextBtn = document.querySelector(".testi-slider-nav .next"));
  activeSlide = sliderContainer.querySelector(".testi-item.active");

  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // Setting Width of all slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });
  // Setting width of sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  function slider() {
    // Deactivating Existing active slide
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");

    // Activating new slide
    slides[slideIndex].classList.add("active");

    sliderContainer.style.marginLeft = -(slideWidth * slideIndex) + "px";
  }
  slider();
})();

// --------------------------- Testimonial Slider Ends --------------------------

// --------------------------- Hiding All Sections Expects Active Ones(Starts) --------------------------

(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

// --------------------------- Hiding All Sections Expects Active Ones(Ends) --------------------------
