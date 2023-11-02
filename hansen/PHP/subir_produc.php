<?php 
require_once ("env.php");
$name_producto = $_POST['nombre'];
$descripcion_producto = $_POST['descripcion'];
$marca = $_POST['marca_selec'];
$estado = $_POST['estado_selec'];
$orien = $_POST['orientacion_selec'];
$entrega = $_POST['entrega_selec'];
$ubicacion = $_POST['ubicacion'];
$price = $_POST['price'];


$sql = "INSERT INTO publications (name, description,  price, brand, state, orientation, send) VALUES ('$name_producto', '$descripcion_producto', '$price' , '$marca', '$estado', '$orien', '$entrega')";
$result = mysqli_query($con,$sql);
echo mysqli_error($con);
die($sql);

//loooooooooooooooooooool!!!