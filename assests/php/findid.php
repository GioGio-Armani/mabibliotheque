<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($_POST['isbn'])) {
        $isbn = filter_input(INPUT_POST, 'isbn', FILTER_VALIDATE_INT);

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
        }
    }
}
