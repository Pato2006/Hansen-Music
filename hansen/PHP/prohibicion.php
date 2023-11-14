<?php
require_once("env.php");
session_start();

if (isset($_SESSION['name']) && $_SESSION['name'] != ""){
    $respuesta = array('estado' => 'activo', 'usuario_nombre' => $_SESSION['name']);
    echo json_encode($respuesta);
}

?>