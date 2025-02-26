<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


if (!isset($db)) {
    require_once('./db.php');
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $db->prepare('SELECT * FROM sp_product ORDER BY id DESC');
        $stmt->execute();
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "RespCode" => 200,
            "RespMessage" => "Success",
            "Result" => $products
        ]);
        http_response_code(200);
    } else {
        echo json_encode([
            "RespCode" => 405,
            "RespMessage" => "Method Not Allowed"
        ]);
        http_response_code(405);
    }
} catch (PDOException $e) {
    echo json_encode([
        "RespCode" => 500,
        "RespMessage" => "Database Error",
        "Error" => $e->getMessage()
    ]);
    http_response_code(500);
}
?>
