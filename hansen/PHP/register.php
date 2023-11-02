<?php
require_once("env.php");
$user = $_POST["name"];
$mail = $_POST["mail"];
$contraseña = $_POST["password"];

if ($user == "" || $mail == "" || $contraseña == "") {
    echo "Ingresa datos";
    exit;
}

if (filter_var($mail, FILTER_SANITIZE_EMAIL) == !$mail) {
    echo "No se admiten caracteres ilegales";
    exit;
}

if (filter_var($mail, FILTER_VALIDATE_EMAIL)) {
} else {
    echo ("Correo invalido");
    exit;
}

$hash = password_hash($contraseña, PASSWORD_DEFAULT);

$sql = "SELECT * FROM users WHERE name = '$user'";
$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
    echo "Ese name de user ya está tomado, elige otro.";
    exit;
} else {
    $sql = "INSERT INTO users (name, password, mail) VALUES ('$user', '$hash', '$mail')";
    $result = mysqli_query($con, $sql);
    mysqli_close($con);

    if ($result) {
        echo "1";
    } else {
        echo "Algo falló";
    }
}
