<?php
require_once('db.php');

try {
    $stmt = $db->query("SHOW TABLES;");
    $tables = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (empty($tables)) {
        echo "❌ No tables found!";
    } else {
        echo "✅ Tables found: ";
        print_r($tables);
    }
} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage();
}
?>










