// -------------------------------- Style Switcher Toggle Starts -------------------------

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");

styleSwitcherToggler.addEventListener("click", () => {
  document.querySelector(".style-switcher").classList.toggle("open");
});

// Hiding Style-switcher on scroll
window.addEventListener("scroll", () => {
  if (document.querySelector(".style-switcher").classList.contains("open")) {
    document.querySelector(".style-switcher").classList.remove("open");
  }
});

// -------------------------------- Style Switcher Toggle Ends -------------------------

// -------------------------------- Theme Colors Starts -------------------------

const alternateStyles = document.querySelectorAll(".alternate-style");

function setActiveStyle(color) {
    localStorage.setItem("color", color);
    changeColor();
}

function changeColor(){
    alternateStyles.forEach((style) => {
        if (localStorage.getItem("color") === style.getAttribute("title")) {
          style.removeAttribute("disabled");
        } else {
          style.setAttribute("disabled", "true");
        }
      });
}

// Checking if 'color' key exist
if(localStorage.getItem("color") !== null){
    changeColor();
}
// -------------------------------- Theme Colors Ends -------------------------

// -------------------------------- Theme Mode Starts -------------------------

const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () =>{
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    }
    else{
        localStorage.setItem("theme", "light");
    }
    updateIcon();
})

function thememode(){
    // Checking If 'theme' key exists
    if(localStorage.getItem("theme") !== null){
        if(localStorage.getItem("theme") === "light"){
            document.body.classList.remove("dark");
        }
        else{
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}

thememode();

function updateIcon(){
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else{
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}

// -------------------------------- Theme Mode Ends -------------------------

