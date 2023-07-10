// modification d'une ligne du tableau ----------------------------

const modifier = (index, id) => {
  console.log(livres[index]);
  let isbn = document.querySelector("#isbn").value;
  let titre = document.querySelector("#titre").value;
  let auteur = document.querySelector("#auteur").value;
  let editeur = document.querySelector("#editeur").value;
  let livre = {
    isbn: isbn,
    titre: titre,
    auteur: auteur,
    editeur: editeur,
  };
  const erreur = validerFormulaire(livre);
  if (Object.keys(erreur).length > 0) {
    afficherErreurs(erreur);
    return;
  }
  livres[index] = livre;
  livre.id = id;

  // requete ajax -----------------------------------------

  const urlModif = "http://localhost/mabibliotheque/assests/php/update.php";

  envoyerRequete(urlModif, livre, (erreur, reponse) => {
    if (erreur) {
      console.log("Erreur: " + erreur);
    }
    console.log(reponse);
  });

  let tr = document.querySelectorAll("tr")[index + 1];
  tr.children[0].textContent = isbn;
  tr.children[1].textContent = titre;
  tr.children[2].textContent = auteur;
  tr.children[3].textContent = editeur;
};
