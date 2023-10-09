<?php
include "env.php";

$con = mysqli_connect(HOST, USER, PASSWORD, DB);

$nombre = $_COOKIE["Usuario"];
$nombre_usuario = $_POST['nombre'];
$mail = $_POST['mail'];
$entrega = $_POST['entrega'];

$sql = "SELECT * FROM usuarios WHERE nombre = '$nombre'";

$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
    $sql_insert = "UPDATE usuarios SET nombre_usuario = '$nombre_usuario', correo = '$mail', envio = '$entrega' WHERE nombre = '$nombre'";
    if (mysqli_query($con, $sql_insert)) {
        echo "Datos Modificados";
    }
    else {
        echo "Hubo un error al modificar los datos: " . mysqli_error($con);
    }
    mysqli_close($con);
} else {
    echo "Error";
}
