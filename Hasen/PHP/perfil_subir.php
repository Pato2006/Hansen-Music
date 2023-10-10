<?php
include "env.php";

$con = mysqli_connect(HOST, USER, PASSWORD, DB);

session_start();

$nombre = $_SESSION['nombre'];
$nombre_usuario = $_POST['nombre'];
$mail = $_POST['mail'];
$entrega = $_POST['entrega'];

/*
$foto_nombre = $_FILES['imagen']['name'];
$foto_tipo = $_FILES['imagen']['type'];
$foto_tamaño = $_FILES['imagen']['size'];
$nombre_temporal = $_FILES['imagen']['tmp_name'];
*/

$sql = "SELECT * FROM usuarios WHERE nombre = '$nombre'";

$result = mysqli_query($con, $sql);

if (mysqli_num_rows($result) > 0) {
    $sql_insert = "UPDATE usuarios SET nombre_usuario = '$nombre_usuario', correo = '$mail', envio = '$entrega' WHERE nombre = '$nombre'";
    if (mysqli_query($con, $sql_insert)) {
        echo "Actualizacion Exitosa";
        /* if(!(strpos($foto_tipo, 'png') || strpos($foto_tipo, 'jpg') && ($foto_tamaño < 100000))){
            echo "La imagen es mayor a 100kb o no es .png o .jpg";
        }
        else{
            if (move_uploaded_file($nombre_temporal, 'imagenes/')){
                echo "El archivo ha sido cargado correctamente.";
         }else{
                echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
         }  
        }
        */
    }
    else {
        echo "Hubo un error al modificar los datos: " . mysqli_error($con);
    }
    mysqli_close($con);
} else {
    echo "Error";
}
