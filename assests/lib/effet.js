let buttonAjout = document.querySelector(".btn3");
let formAjoute = document.querySelector(".ajoutlivre");
buttonAjout.addEventListener("click", function () {
  formAjoute.classList.toggle("active");
  btnmModifer.classList.add("hidden");
  button.classList.remove("hidden");
});
