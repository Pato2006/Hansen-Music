<?php
include "env.php";
$nombre = $_COOKIE["Usuario"];
$con = mysqli_connect(HOST, USER, PASSWORD, DB);
$sql = "SELECT nombre_usuario,correo,reputacion,envio FROM usuarios WHERE nombre = '$nombre'";
$result = mysqli_query($con,$sql);

if($result){
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
    echo json_encode($data);
}
?>