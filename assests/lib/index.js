// Fonction: Ajout d'une ligne au tableau

// recuperation du tableau dans le local storage ---------------------
let livrestest = document.querySelectorAll("tbody tr");
let livres = [];
console.log(livrestest);
for (let i = 0; i < livrestest.length; i++) {
  let livre = {
    isbn: livrestest[i].children[0].textContent,
    titre: livrestest[i].children[1].textContent,
    auteur: livrestest[i].children[2].textContent,
    editeur: livrestest[i].children[3].textContent,
  };
  livres.push(livre);
}
console.log(livres);

// recuperation des elements -------------------------
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let button = document.querySelector("#button");
let formAjout = document.querySelector(".ajoutlivre");
let btnmModifer = document.querySelector("#button2");

// ajout de l'evenement au bouton et touche enter -----------------------

button.addEventListener("click", ajoutTableau);

document.addEventListener("keydown", (e) => {
  if (
    e.key == "Enter" &&
    formAjout.classList.contains("active") &&
    !button.classList.contains("hidden")
  ) {
    ajoutTableau();
  }
});

// suppression d'une ligne du tableau ----------------------------
let index;
table.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    let tr = e.target.parentNode.parentNode;
    let isbn = tr.children[0].textContent;
    let titre = tr.children[1].textContent;
    let auteur = tr.children[2].textContent;
    let editeur = tr.children[3].textContent;
    let livre = {
      isbn: isbn,
      titre: titre,
      auteur: auteur,
      editeur: editeur,
    };
    let indexsuppr = livres.findIndex((livre) => {
      return livre.isbn == isbn;
    });
    livres.splice(indexsuppr, 1);
    tr.remove();
    // requete ajax -----------------------------------------

    const urlSuppr = "http://localhost/mabibliotheque/assests/php/delete.php";

    envoyerRequete(urlSuppr, livre, (erreur, reponse) => {
      if (erreur) {
        console.log("Erreur: " + erreur);
      }
      console.log(reponse);
    });
  } else if (e.target.classList.contains("btn2")) {
    let tr = e.target.parentNode.parentNode;
    let isbn = tr.children[0].textContent;
    let titre = tr.children[1].textContent;
    let auteur = tr.children[2].textContent;
    let editeur = tr.children[3].textContent;
    let livre = {
      isbn: isbn,
      titre: titre,
      auteur: auteur,
      editeur: editeur,
    };
    // requete ajax -----------------------------------------

    const urlFindId = "http://localhost/mabibliotheque/assests/php/findid.php";

    envoyerRequete(urlFindId, livre, (erreur, reponse) => {
      if (erreur) {
        console.log("Erreur: " + erreur);
      } else {
        let id = parseInt(reponse);
        console.log(id);
        index = livres.findIndex((livre) => {
          return livre.isbn == isbn;
        });
        formAjout.classList.toggle("active");
        btnmModifer.classList.remove("hidden");
        button.classList.add("hidden");
        let isbnValue = document.querySelector("#isbn");
        let titreValue = document.querySelector("#titre");
        let auteurValue = document.querySelector("#auteur");
        let editeurValue = document.querySelector("#editeur");

        isbnValue.value = isbn;
        titreValue.value = titre;
        auteurValue.value = auteur;
        editeurValue.value = editeur;
        btnmModifer.addEventListener("click", () => modifier(index, id));
      }
    });
  }
});

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
