// Fonction: Ajout d'une ligne au tableau

// recuperation du tableau dans le local storage ---------------------

let livres = [];

// recuperation des elements -------------------------
let table = document.querySelector("table");
let tbody = document.querySelector("tbody");
let button = document.querySelector("#button");

const ajoutTableau = () => {
  // recuperation des valeurs des inputs ----------------

  let isbn = document.querySelector("#isbn").value;
  let titre = document.querySelector("#titre").value;
  let auteur = document.querySelector("#auteur").value;
  let editeur = document.querySelector("#editeur").value;

  // enregistrement des valeurs dans l'objet Livre ---------

  let livre = {
    isbn: isbn,
    titre: titre,
    auteur: auteur,
    editeur: editeur,
  };

  // gestion des erreurs - -----------------------------

  let isbnerror = document.querySelector(".isbnerror");
  let titreerror = document.querySelector(".titreerror");
  let auteurerror = document.querySelector(".auteurerror");
  let editeurerror = document.querySelector(".editeurerror");

  // reinitialisation des erreurs
  isbnerror.textContent = "";
  titreerror.textContent = "";
  auteurerror.textContent = "";
  editeurerror.textContent = "";

  if (livre.isbn == "") {
    isbnerror.textContent = "Veuillez remplir ce champ";
    isbnerror.style.color = "red";
    document.querySelector("#isbn").focus();
    return;
  } else if (isNaN(livre.isbn)) {
    isbnerror.textContent = "Veuillez entrer un nombre";
    isbnerror.style.color = "red";
    document.querySelector("#isbn").focus();
    return;
  } else if (livre.isbn.length > 13 || livre.isbn.length < 10) {
    isbnerror.textContent = "Veuillez entrer un isbn valide (10 à 13 chiffres)";
    isbnerror.style.color = "red";
    document.querySelector("#isbn").focus();
    return;
  }

  if (livre.titre == "") {
    titreerror.textContent = "Veuillez remplir ce champ";
    titreerror.style.color = "red";
    document.querySelector("#titre").focus();
    return;
  }

  if (livre.auteur == "") {
    auteurerror.textContent = "Veuillez remplir ce champ";
    auteurerror.style.color = "red";
    document.querySelector("#auteur").focus();
    return;
  }

  if (livre.editeur == "") {
    editeurerror.textContent = "Veuillez remplir ce champ";
    editeurerror.style.color = "red";
    document.querySelector("#editeur").focus();
    return;
  }

  // verification de l'unicité de l'isbn et du titre ----------------

  for (let i = 0; i < livres.length; i++) {
    if (livre.isbn == livres[i].isbn) {
      isbnerror.textContent = "Ce numéro ISBN existe déjà";
      isbnerror.style.color = "red";
      document.querySelector("#isbn").focus();
      return;
    }
    if (livre.titre == livres[i].titre) {
      titreerror.textContent = "Ce titre existe déjà";
      titreerror.style.color = "red";
      document.querySelector("#titre").focus();
      return;
    }
  }

  // ajout de l'objet dans le tableau livres ------------------

  livres.push(livre);

  // creation des elements du tableau --------------------

  let tr = document.createElement("tr");
  let tdIsbn = document.createElement("td");
  let tdTitre = document.createElement("td");
  let tdAuteur = document.createElement("td");
  let tdEditeur = document.createElement("td");
  let tdSupprimer = document.createElement("td");
  let buttonSupprimer = document.createElement("button");
  buttonSupprimer.textContent = "X";
  buttonSupprimer.classList.add("btn");
  let buttonModifier = document.createElement("button");
  buttonModifier.textContent = "Mofifier";
  buttonModifier.classList.add("btn2");

  // ajout des valeurs aux elements du tableau -----------

  tdIsbn.textContent = livre.isbn;
  tdTitre.textContent = livre.titre;
  tdAuteur.textContent = livre.auteur;
  tdEditeur.textContent = livre.editeur;
  tdSupprimer.appendChild(buttonSupprimer);
  tdSupprimer.appendChild(buttonModifier);

  // ajout des elements au tableau -----------------------

  tr.appendChild(tdIsbn);
  tr.appendChild(tdTitre);
  tr.appendChild(tdAuteur);
  tr.appendChild(tdEditeur);
  tr.appendChild(tdSupprimer);

  // ajout de la ligne au tableau ------------------------
  tbody.appendChild(tr);

  // reinitialisation des inputs -------------------------

  document.querySelector("#isbn").value = "";
  document.querySelector("#titre").value = "";
  document.querySelector("#auteur").value = "";
  document.querySelector("#editeur").value = "";
  // initialisation du focus -----------------------------
  document.querySelector("#isbn").focus();

  // requete ajax -----------------------------------------

  let xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    "http://localhost/mabibliotheque/assests/php/traitement.php"
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(
    "isbn=" +
      isbn +
      "&titre=" +
      titre +
      "&auteur=" +
      auteur +
      "&editeur=" +
      editeur
  );

  xhr.onload = () => {
    console.log(xhr.responseText);
  };
};

// ajout de l'evenement au bouton et touche enter -----------------------

button.addEventListener("click", ajoutTableau);

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    ajoutTableau();
  }
});

// suppression d'une ligne du tableau ----------------------------

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
    let index = livres.findIndex((livre) => {
      return livre.isbn == isbn;
    });
    livres.splice(index, 1);
    tr.remove();
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/mabibliotheque/assests/php/delete.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(
      "isbn=" +
        isbn +
        "&titre=" +
        titre +
        "&auteur=" +
        auteur +
        "&editeur=" +
        editeur
    );

    xhr.onload = () => {
      console.log(xhr.responseText);
    };
  }
});

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
