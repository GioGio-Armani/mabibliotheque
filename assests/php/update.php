<?php
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    if (isset($data['isbn']) && isset($data['titre']) && isset($data['auteur']) && isset($data['editeur']) && isset($data['id'])) {
        $isbn = intval($data['isbn']);
        $id = intval($data['id']);
        $titre = $data['titre'];
        $auteur = $data['auteur'];
        $editeur = $data['editeur'];

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
            echo "Erreur de données 2";
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
