<?php

// suppression d'un livre

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['isbn'])) {
        $isbn = filter_input(INPUT_POST, 'isbn', FILTER_VALIDATE_INT);
        if ($isbn) {
            $bbd = new SQLite3('../database/db.sqlite');

            $sql = "DELETE FROM livres WHERE isbn = :isbn";
            $stmt = $bbd->prepare($sql);
            $stmt->bindValue(':isbn', $isbn, SQLITE3_INTEGER);
            $stmt->execute();
            echo "Livre supprimé";
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
