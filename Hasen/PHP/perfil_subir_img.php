<?php
include "env.php";

$con = mysqli_connect(HOST, USER, PASSWORD, DB);
session_start();

$nombre = $_SESSION['nombre'];
$nombre_imagen = $_POST['nomb'];
$tipo_imagen = $_POST['tipo'];
$tamaño_imagen = $_POST['tamaño'];
$temp_imagen = $_FILES['imagen']['tmp_name']; 

$sql = "SELECT * FROM usuarios WHERE nombre = '$nombre'";

$result = mysqli_query($con, $sql);
if (mysqli_query($con, $sql)) {
    if (!(strpos($tipo_imagen, 'png') || strpos($tipo_imagen, 'jpg') && ($tamaño_imagen < 100000))) {
        echo "La imagen es mayor a 100kb o no es .png o .jpg";
    } else {
        $directorio_destino = '../imagenes/';
        $ruta_imagen = $directorio_destino . $nombre_imagen;
        if (move_uploaded_file($temp_imagen, $ruta_imagen)) {
            echo "El archivo ha sido cargado correctamente.";
        } else {
            echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
        }
    }
}
