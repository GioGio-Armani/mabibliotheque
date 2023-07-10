<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    if (isset($data['isbn']) && isset($data['titre']) && isset($data['auteur']) && isset($data['editeur'])) {
        $isbn = filter_var($data['isbn'], FILTER_VALIDATE_INT);
        $titre = $data['titre'];
        $auteur = $data['auteur'];
        $editeur = $data['editeur'];

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
            echo "isbn est false";
            exit;
        }
    } else {
        echo "Erreur de données";
        exit;
    }
} else {
    echo "Erreur de données JSON";
    exit;
}
