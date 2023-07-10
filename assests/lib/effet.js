let buttonAjout = document.querySelector(".btn3");
let formAjoute = document.querySelector(".ajoutlivre");
buttonAjout.addEventListener("click", function () {
  document.querySelector("#isbn").value = "";
  document.querySelector("#titre").value = "";
  document.querySelector("#auteur").value = "";
  document.querySelector("#editeur").value = "";
  formAjoute.classList.toggle("active");
  btnmModifer.classList.add("hidden");
  button.classList.remove("hidden");
});
