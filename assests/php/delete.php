<?php

// suppression d'un livre
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    if (isset($data['isbn'])) {
        $isbn = intval($data['isbn']);
        if ($isbn) {
            $bbd = new SQLite3('../database/db.sqlite');

            $sql = "DELETE FROM livres WHERE isbn = :isbn";
            $stmt = $bbd->prepare($sql);
            $stmt->bindValue(':isbn', $isbn, SQLITE3_INTEGER);
            $stmt->execute();
            echo "Livre supprimé";
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
