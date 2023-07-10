<?php
$data = json_decode(file_get_contents('php://input'), true);
if ($data) {
    if (isset($data['isbn'])) {
        $isbn = intval($data['isbn']);

        if ($isbn) {
            $pdo = new SQLite3('../database/db.sqlite');
            $sql = "SELECT * FROM livres WHERE isbn = :isbn";
            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(':isbn', $isbn, SQLITE3_INTEGER);
            $result = $stmt->execute();
            $row = $result->fetchArray(SQLITE3_ASSOC);
            if ($row) {
                echo $row['id'];
            } else {
                echo json_encode(['error' => 'Aucun livre trouvé.']);
            }
        } else {
            echo json_encode(['error' => 'isbn est false']);
        }
    } else {
        echo json_encode(['error' => 'Erreur de données']);
    }
} else {
    echo json_encode(['error' => 'Erreur de données JSON']);
}
