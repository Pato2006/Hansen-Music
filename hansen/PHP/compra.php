<?php
require_once("env.php");
session_start();
$id = $_POST['id'];
date_default_timezone_set('America/Argentina/Buenos_Aires');

if (isset($_SESSION['name'])) {
    $user = $_SESSION['name'];
    $sql = "SELECT id FROM users WHERE name = '$user' OR mail = '$user'";
    $result = mysqli_query($con, $sql);
    $data = array();
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row; 
        }
    }
    $comprador = $data[0]['id'];
    $fecha = date('Y-m-d H:i:s');

    $stmt = mysqli_prepare($con, "INSERT INTO buys (user_buyer_id, publication_id, status_id, purchase_date) VALUES (?, ?, 1, ?)");
    mysqli_stmt_bind_param($stmt, 'sss', $comprador, $id, $fecha);

    $result = mysqli_stmt_execute($stmt);

    if ($result) {
        echo json_encode(["message" => "Gracias por tu compra"]);
    } else {
        echo json_encode(["error" => mysqli_error($con)]);
    }
} else {
    echo json_encode(["message" => "No estas logeado"]);
    exit;
}
?>
