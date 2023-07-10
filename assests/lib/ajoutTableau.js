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

  const erreur = validerFormulaire(livre);
  if (Object.keys(erreur).length > 0) {
    afficherErreurs(erreur);
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
  console.log(livres);

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

  const urlAjout = "http://localhost/mabibliotheque/assests/php/traitement.php";

  envoyerRequete(urlAjout, livre, (erreur, reponse) => {
    if (erreur) {
      console.log("Erreur: " + erreur);
    }
    console.log(reponse);
  });
};
