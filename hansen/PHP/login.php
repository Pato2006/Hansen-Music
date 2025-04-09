<?php
require_once ("env.php");
$user = $_POST["username"];
$contraseña = $_POST["password"];

$sql = "SELECT * FROM users WHERE username = '$user' OR mail = '$user'";
$result = mysqli_query($con, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    if ($row && password_verify($contraseña, $row['password'])) {
        session_start();
        $_SESSION['username'] = $row['username'];
        echo "1";
    } else {
        echo "Usuario o contraseña incorrectos";
    }
} else {
    echo "Error en la consulta";
}
