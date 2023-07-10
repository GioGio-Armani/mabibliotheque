const validerFormulaire = (livre) => {
  const erreurs = {};

  if (livre.isbn === "") {
    erreurs.isbn = "Veuillez remplir ce champ";
  } else if (isNaN(livre.isbn)) {
    erreurs.isbn = "Veuillez entrer un nombre";
  } else if (livre.isbn.length > 13 || livre.isbn.length < 10) {
    erreurs.isbn = "Veuillez entrer un ISBN valide (10 à 13 chiffres)";
  }

  if (livre.titre === "") {
    erreurs.titre = "Veuillez remplir ce champ";
  }

  if (livre.auteur === "") {
    erreurs.auteur = "Veuillez remplir ce champ";
  }

  if (livre.editeur === "") {
    erreurs.editeur = "Veuillez remplir ce champ";
  }

  return erreurs;
};

const afficherErreurs = (erreurs) => {
  const champs = {
    isbn: document.querySelector(".isbnerror"),
    titre: document.querySelector(".titreerror"),
    auteur: document.querySelector(".auteurerror"),
    editeur: document.querySelector(".editeurerror"),
  };

  for (const champ in champs) {
    const erreur = erreurs[champ];
    const champErreur = champs[champ];

    if (erreur) {
      champErreur.textContent = erreur;
      champErreur.style.color = "red";
      champErreur.parentNode.querySelector("input").focus();
    } else {
      champErreur.textContent = "";
    }
  }
};
