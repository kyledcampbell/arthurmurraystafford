const submitButton = document.getElementById("submit");
const inputs = document.querySelectorAll("#careersForm input");
const theform = document.getElementById("careersForm");
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
