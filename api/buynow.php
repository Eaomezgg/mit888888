<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


if (!isset($db)) {
    require_once('./db.php');
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        
        $inputJSON = file_get_contents("php://input");
        $input = json_decode($inputJSON, true);

        
        if (!isset($input['product']) || !is_array($input['product'])) {
            echo json_encode([
                "RespCode" => 400,
                "RespMessage" => "Invalid product data"
            ]);
            http_response_code(400);
            exit();
        }

        $product = $input['product'];
        $amount = 0;

        
        $stmt = $db->prepare('SELECT id, price FROM sp_product ORDER BY id DESC');
        $stmt->execute();
        $queryproduct = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (!$queryproduct) {
            echo json_encode([
                "RespCode" => 500,
                "RespMessage" => "Error: Cannot retrieve product data"
            ]);
            http_response_code(500);
            exit();
        }

       
        foreach ($product as $item) {
            foreach ($queryproduct as $qItem) {
                if ((int) $item['id'] === (int) $qItem['id']) {
                    $amount += ((int) $item['count'] * (float) $qItem['price']);
                    break;
                }
            }
        }

        
        $vat = number_format($amount * 0.07, 2, '.', '');
        $netamount = number_format($amount + $vat, 2, '.', '');

        $transid = round(microtime(true) * 1000);
        $product_json = json_encode($product, JSON_UNESCAPED_UNICODE);
        $updated_at = date("Y-m-d H:i:s");

       
        $stmt = $db->prepare('
            INSERT INTO sp_transaction (transid, orderlist, amount, vat, netamount, operation, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ');

        if ($stmt->execute([$transid, $product_json, $amount, $vat, $netamount, 'PENDING', $updated_at])) {
            echo json_encode([
                "RespCode" => 200,
                "RespMessage" => "Success",
                "amount" => $amount,
                "vat" => $vat,
                "netamount" => $netamount
            ]);
            http_response_code(200);
            exit();  
        } else {
            echo json_encode([
                "RespCode" => 500,
                "RespMessage" => "Error: Insert transaction failed"
            ]);
            http_response_code(500);
            exit();
        }
    } else {
        echo json_encode([
            "RespCode" => 405,
            "RespMessage" => "Method Not Allowed"
        ]);
        http_response_code(405);
        exit();
    }
} catch (PDOException $e) {
    echo json_encode([
        "RespCode" => 500,
        "RespMessage" => "Database Error",
        "Error" => $e->getMessage()
    ]);
    http_response_code(500);
    exit();
}
?>
