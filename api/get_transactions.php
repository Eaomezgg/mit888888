<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$host = "sql113.infinityfree.com";
$dbname = "if0_38384762_sumitttttttttttt";
$username = "if0_38384762";
$password = "ptMnnOIfgmL";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM sp_transaction ORDER BY updated_at DESC");
    $transactions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["RespCode" => 200, "Result" => $transactions]);
} catch (PDOException $e) {
    echo json_encode(["RespCode" => 500, "Error" => $e->getMessage()]);
}
?>
