<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['isbn']) && isset($_POST['titre']) && isset($_POST['auteur']) && isset($_POST['editeur'])) {
        $isbn = filter_input(INPUT_POST, 'isbn', FILTER_VALIDATE_INT);
        $titre = $_POST['titre'];
        $auteur = $_POST['auteur'];
        $editeur = $_POST['editeur'];

        if ($isbn && $titre && $auteur && $editeur) {
            $bbd = new SQLite3('../database/db.sqlite');
            $sql = "INSERT INTO livres (isbn, titre, auteur, editeur) VALUES (:isbn, :titre, :auteur, :editeur)";
            $stmt = $bbd->prepare($sql);
            $stmt->bindValue(':isbn', $isbn, SQLITE3_INTEGER);
            $stmt->bindValue(':titre', $titre, SQLITE3_TEXT);
            $stmt->bindValue(':auteur', $auteur, SQLITE3_TEXT);
            $stmt->bindValue(':editeur', $editeur, SQLITE3_TEXT);
            $stmt->execute();
            echo "Livre ajouté";
        } else {
            echo "Erreur de données";
            exit;
        }
    } else {
        echo "Erreur de données";
        exit;
    }
} else {
    echo "Erreur de méthode";
    exit;
}
