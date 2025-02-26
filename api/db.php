<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

$db_host = 'sql12.freesqldatabase.com'; 
$db_name = 'sql12764398';
$db_user = 'sql12764398';
$db_pass = '2qICIsdaVB';

try {
    $db = new PDO(
        "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4",
        $db_user,
        $db_pass
    );
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
} catch (PDOException $e) {
    echo json_encode([
        "RespCode" => 500,
        "RespMessage" => "Database Connection Failed",
        "Error" => $e->getMessage()
    ]);
    exit();
}
?>
