// // Hero Slider Script //

const carousel = document.querySelector(".carousel");
const slider = document.querySelector(".slider");
const slide = document.querySelectorAll(".slide");
const slideText = document.querySelectorAll(".slider-text");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const sliderLinks = document.querySelectorAll(".slide a");

let Index = 1;
let direction = -1;
let intervalID = 0;

//  /Slider Animations/

const slideTextAnimation = function () {
  slideText.forEach((element) =>
    element.animate(
      [
        {transform: "translateX(2%)", opacity: "0", offset: 0.3},
        {
          transform: "translateX(2%)",
          opacity: "0",
          offset: 0.75,
          easing: "ease-out",
        },
        {transform: "translateX(0)", opacity: "1"},
      ],
      1300
    )
  );
};

const slideAnimationScale = function () {
  slide.forEach((element) =>
    element.animate(
      [
        {
          transform: "scale(1)",
          offset: 0,
        },
        {
          transform: "scale(.92)",
          offset: 0.25,
          easing: "ease-out",
        },
        {
          transform: "scale(.92)",
          offset: 0.8,
          easing: "ease-out",
        },
        {transform: "scale(1)", offset: 1, easing: "ease-out"},
      ],
      1300
    )
  );
};

// /Event Listeners/

next.addEventListener("click", function () {
  direction = -1;
  carousel.style.justifyContent = "flex-start";
  slider.style.transform = "translate(-40%)";
  slideAnimationScale();
  slideTextAnimation();
  clearInterval(intervalID);
  startShow();
});

prev.addEventListener("click", function () {
  if (direction === -1) {
    direction = 1;
    slider.appendChild(slider.firstElementChild);
  }
  carousel.style.justifyContent = "flex-end";
  slider.style.transform = "translate(40%)";
  slideAnimationScale();
  slideTextAnimation();
  clearInterval(intervalID);
  startShow();
});

slider.addEventListener(
  "transitionend",
  function () {
    if (direction === 1) {
      slider.prepend(slider.lastElementChild);
    } else {
      slider.appendChild(slider.firstElementChild);
    }
    slider.style.transition = "none";
    slider.style.transform = "translate(0)";
    setTimeout(() => {
      slider.style.transition = "all 1040ms";
    });
  },
  false
);

// /Propagation fix for Slider links/

sliderLinks.forEach((el) =>
  el.addEventListener("transitionend", function (event) {
    event.stopImmediatePropagation();
  })
);

// /Slider autoplay/

function startShow() {
  if (navToggle.checked !== true) {
    intervalID = setInterval(function () {
      direction = -1;
      carousel.style.justifyContent = "flex-start";
      slider.style.transform = "translate(-40%)";

      slideAnimationScale();
      slideTextAnimation();
    }, 5000);
  }
}

startShow();

slider.addEventListener("mouseover", function () {
  clearInterval(intervalID);
});

slider.addEventListener(
  "touchstart",
  function () {
    clearInterval(intervalID);
  },
  {passive: true}
);

slider.addEventListener("mouseout", function () {
  startShow();
});
slider.addEventListener(
  "touchend",
  function () {
    startShow();
  },
  {passive: true}
);
let yOffset = window.pageYOffset;
