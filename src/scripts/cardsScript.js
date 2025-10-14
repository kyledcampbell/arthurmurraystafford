// Cards Script

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn, false);
  }
}
ready(() => {
  const cards = document.querySelectorAll(".cardJs");
  const mainLinks = document.querySelectorAll(".main-linkJs");

  cards.forEach((item) => {
    item.addEventListener(
      "click",
      function (event) {
        const isTextSelected = window.getSelection().toString();
        if (!isTextSelected) {
          if (item.id === "card1") {
            mainLinks[0].click();
          } else if (item.id === "card2") {
            mainLinks[1].click();
          } else if (item.id === "card3") {
            mainLinks[2].click();
          } else if (item.id === "card4") {
            mainLinks[3].click();
          } else if (item.id === "card5") {
            mainLinks[4].click();
          }
        }
      },
      false
    );
  });

  const clickableElements = Array.from(document.querySelectorAll(".clickable"));
  clickableElements.forEach((el) =>
    el.addEventListener("click", (e) => e.stopPropagation(), false)
  );
});
