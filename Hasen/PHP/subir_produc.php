<?php 
include "env.php";
print_r($_POST);
die;
$con = mysqli_connect(HOST, USER, PASSWORD, DB);
$nombre_producto = $_POST['nombre'];
$descripcion_producto = $_POST['descripcion'];
$ubicacion = $_POST['ubicacion'];
$precio = $_POST['precio'];
$sql = "UPDATE productos SET nombre_producto = '$nombre_producto', descripcion_producto = '$descripcion_producto', precio = '$precio' ";
$result = mysqli_query($con,$sql);

echo "ASD";
?>