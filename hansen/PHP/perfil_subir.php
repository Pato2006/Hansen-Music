<?php
require_once("env.php");
require_once("envio.php"); // $envio
session_start();

$name = $_SESSION['name'];
$mail = $_POST['mail'];
$location = $_POST['residencia'];
$entrega = $_POST['entrega_selec'];

if (filter_var($mail, FILTER_SANITIZE_EMAIL) == !$mail) {
    echo "No se admiten caracteres ilegales";
    exit;
}

if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
} else {
    echo ("Correo invalido");
    exit;
}

$sql = "SELECT * FROM users WHERE name = '$name'";
$result = mysqli_query($con, $sql);

foreach ($envio as $envios) {
    $id = $envios["id"];
    $state = $envios["name"];
    if($state == $entrega){
        $entrega = $id;
        break;
    }
}

if (mysqli_num_rows($result) > 0) {
    $sql_insert = "UPDATE users SET mail = '$mail', `send_id` = '$entrega', `location` = '$location' WHERE name = '$name'";
    if (mysqli_query($con, $sql_insert)) {
        echo "Actualizacion Exitosa";
    } else {
        echo "Hubo un error al modificar los datos: " . mysqli_error($con);
    }
    mysqli_close($con);
} else {
    echo "Error";
}
