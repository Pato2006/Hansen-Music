<?php
include "env.php";

$usuario = $_POST["usuario"];
$contraseña = $_POST["password"];
$hash = password_hash($contraseña, PASSWORD_DEFAULT);
$con = mysqli_connect(HOST, USER, PASSWORD, DB);

$sql = "SELECT * FROM usuarios WHERE nombre = '$usuario' OR correo = '$usuario'";
$result = mysqli_query($con, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    if ($row && password_verify($contraseña, $row['contraseña'])) {
        session_start();
        $_SESSION['nombre'] = $row['nombre'];
        echo "1";
    } else {
        echo "Usuario o contraseña incorrectos";
    }
} else {
    echo "Error en la consulta";
}
