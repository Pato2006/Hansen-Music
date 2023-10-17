<?php
include "env.php";

$usuario = $_POST["nombre"];
$contraseña = $_POST["password"];
$hash = password_hash($contraseña, PASSWORD_DEFAULT);
$con = mysqli_connect(HOST, USER, PASSWORD, DB);

$sql = "INSERT INTO usuarios (nombre, contraseña) VALUES ('$usuario', '$hash')";
$result = mysqli_query($con, $sql);
mysqli_close($con);

if ($result) {
    echo "1";
} else {
    echo "Algo fallo";
}
