<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ma bibliothèque</title>
    <link rel="stylesheet" href="./assests/styles/style.css">
</head>

<body>
    <h2>Ma Bibliothèque</h2>
    <div class="tablecontainer">

        <table>
            <thead>
                <tr>

                    <th>ISBN</th>
                    <th>Titre</th>
                    <th>Auteur</th>
                    <th>Editeur</th>
                    <th>Editer</th>
                </tr>
            </thead>
            <tbody>

                <?php
                $pdo = new SQLite3('./assests/database/db.sqlite');

                // Requête de sélection pour récupérer tous les enregistrements de la table "livres"
                $sql = "SELECT * FROM livres";
                $result = $pdo->query($sql);

                // Vérification des résultats de la requête
                if ($result) {
                    // Parcourir les résultats et afficher les données dans le HTML
                    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
                        echo "<tr>";
                        echo "<td>" . $row['isbn'] . "</td>";
                        echo "<td>" . $row['titre'] . "</td>";
                        echo "<td>" . $row['auteur'] . "</td>";
                        echo "<td>" . $row['editeur'] . "</td>";
                        echo "<td><button class='btn'>X</button><button class=btn2>Modifer</button></td>";
                        echo "</tr>";
                    }
                } else {
                    echo "Aucun enregistrement trouvé.";
                }

                // Fermer la connexion à la base de données
                $pdo->close();
                ?>
            </tbody>
        </table>
    </div>

    <button class="btn3">Ajouter un livre</button>

    <form class="ajoutlivre" action="traitement.php" method="post">


        <h2>Formulaire</h2>
        <div class="cards-form">

            <label for="isbn">ISBN</label>
            <input type="number" name="isbn" id="isbn" placeholder="Entrer le numéro ISBN">
            <p class="isbnerror"></p>
            <label for="titre">Titre</label>
            <input type="text" name="titre" id="titre" placeholder="Entrer le titre">
            <p class="titreerror"></p>
            <label for="auteur">Auteur</label>
            <input type="text" name="auteur" id="auteur" placeholder="Entrer le nom de l'auteur">
            <p class="auteurerror"></p>
            <label for="editeur">Editeur</label>
            <input type="text" name="editeur" id="editeur" placeholder="Entrer la maison d'édition">
            <p class="editeurerror"></p>
            <button id="button">Envoyer</button>
            <button id="button2" class="hidden">Modifer</button>
        </div>
    </form>
    <script src="./assests/lib/effet.js"></script>
    <script src="./assests/lib/ajoutTableau.js"></script>
</body>

</html>