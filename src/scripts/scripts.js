const submitButton = document.getElementById("submit");
const inputs = document.querySelectorAll("#contactForm input");
const theform = document.getElementById("contactForm");
function addDirtyListeners() {
  inputs.forEach(function (input) {
    input.addEventListener("input", dirtyInput, false);
    input.addEventListener("blur", dirtyInput, false);
  });
}

function dirtyInput(evt) {
  elem = evt.currentTarget;
  if ((elem.nodeName = "INPUT")) {
    elem.classList.add("dirty");
  }
}

window.addEventListener(
  "load",
  (e) => {
    addDirtyListeners(), submitButton.setAttribute("disabled", "disabled");
    submitButton.style.cursor = "not-allowed";
  },
  false
);

inputs.forEach(function (input) {
  input.addEventListener(
    "keyup",
    (evt) => {
      const value = evt.currentTarget.value;
      submitButton.disabled = false;
      submitButton.style.cursor = "pointer";

      if (value === "") {
        submitButton.disabled = true;
        submitButton.style.cursor = "not-allowed";
      }
    },
    false
  );
});

// Mobile close on NewStudentOffer click
const newStudentOffer = document.querySelector("#newStudentOffer");
const contactButtonMobile = document.querySelector("#contactButtonMobile");
const calendarLink = document.querySelector("#calendarLink");
const navToggle = document.querySelector("#navToggle");

newStudentOffer.addEventListener(
  "click",
  function closeMenu() {
    navToggle.checked = false;
  },
  false
);

calendarLink.addEventListener(
  "click",
  function closeMenu() {
    navToggle.checked = false;
  },
  false
);

contactButtonMobile.addEventListener(
  "click",
  function closeMenu() {
    navToggle.checked = false;
  },
  false
);

// Prevents form being submitted twice with double click

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    // Prevent if already submitting
    if (form.classList.contains("is-submitting")) {
      e.preventDefault();
    }

    // Add class to hook our visual indicator on
    form.classList.add("is-submitting");
  });
});
