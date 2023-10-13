<?php 
include "env.php";

$con = mysqli_connect(HOST, USER, PASSWORD, DB);
$nombre_producto = $_POST['nombre'];
$descripcion_producto = $_POST['descripcion'];
$marca = $_POST['marca_selec'];
$estado = $_POST['estado_selec'];
$orien = $_POST['orientacion_selec'];
$entrega = $_POST['entrega_selec'];
$ubicacion = $_POST['ubicacion'];
$precio = $_POST['precio'];

$sql = "INSERT INTO productos (nombre, precio, marca, estado, orientacion, entrega, ubicacion) VALUES ('$nombre_producto', '$precio', '$marca', '$estado', '$orien', '$entrega', '$ubicacion')";
$result = mysqli_query($con,$sql);
if ($result) {
    echo "Bien";
} else {
    echo "Error al actualizar el producto: " . mysqli_error($con);
}
?>