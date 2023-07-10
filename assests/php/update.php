<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['isbn']) && isset($_POST['titre']) && isset($_POST['auteur']) && isset($_POST['editeur']) && isset($_POST['id'])) {
        $isbn = filter_input(INPUT_POST, 'isbn', FILTER_VALIDATE_INT);
        $id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
        $titre = $_POST['titre'];
        $auteur = $_POST['auteur'];
        $editeur = $_POST['editeur'];

        if ($isbn && $titre && $auteur && $editeur && $id) {
            $bbd = new SQLite3('../database/db.sqlite');
            $sql = "UPDATE livres SET isbn = :isbn, titre = :titre, auteur = :auteur, editeur = :editeur WHERE id = :id;
            ";
            $stmt = $bbd->prepare($sql);
            $stmt->bindValue(':isbn', $isbn, SQLITE3_INTEGER);
            $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
            $stmt->bindValue(':titre', $titre, SQLITE3_TEXT);
            $stmt->bindValue(':auteur', $auteur, SQLITE3_TEXT);
            $stmt->bindValue(':editeur', $editeur, SQLITE3_TEXT);
            $stmt->execute();
            echo "Livre modifié";
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
