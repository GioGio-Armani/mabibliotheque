function envoyerRequete(url, donnees, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      callback(null, xhr.responseText);
    } else {
      callback("Erreur : " + xhr.status);
    }
  };
  xhr.onerror = function () {
    callback("Erreur de connexion");
  };
  xhr.send(JSON.stringify(donnees));
}
