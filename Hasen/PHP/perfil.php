<?php
include "env.php";
session_start();
$nombre = $_SESSION['nombre'];
$con = mysqli_connect(HOST, USER, PASSWORD, DB);
$sql = "SELECT nombre,nombre_usuario,correo,reputacion,envio FROM usuarios WHERE nombre = '$nombre'";
$result = mysqli_query($con, $sql);

if ($result) {
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
}

$imagenes = scandir('../imagenes');
$imagenNombre = array();
foreach ($imagenes as $archivo) {
    if (pathinfo($archivo, PATHINFO_EXTENSION) === 'png') {
        $imagenNombre[] = $archivo;
    }
}
$data['imagenes'] = $imagenNombre;

echo json_encode($data);
