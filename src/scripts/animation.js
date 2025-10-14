const inViewPort = function (el) {
  let rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0 && rect.bottom >= 0) ||
    (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
    (rect.top >= 0 && rect.bottom <= window.innerHeight)
  );
};

function animationReady(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn, false);
  }
}

animationReady(() => {
  let animation = document.querySelectorAll(".animation");
  let asl = document.querySelectorAll(".asl");
  let ascale = document.querySelectorAll(".ascale");
  let afade = document.querySelectorAll(".afade");

  function animate(item) {
    item.classList.add("opacity0");
  }
  animation.forEach(animate);

  function entranceAnimation() {
    asl.forEach(slideInLeft);
    ascale.forEach(scaleIn);
    afade.forEach(fadeIn);

    function slideInLeft(item) {
      if (inViewPort(item)) {
        return item.classList.add("slide-in-left");
      }
    }

    function scaleIn(item) {
      if (inViewPort(item)) {
        return item.classList.add("scale-in");
      }
    }

    function fadeIn(item) {
      if (inViewPort(item)) {
        return item.classList.add("fade-in");
      }
    }

    window.requestAnimationFrame(entranceAnimation);
  }

  window.requestAnimationFrame(entranceAnimation);
});
