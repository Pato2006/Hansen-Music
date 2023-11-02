<?php
include_once "env.php"; 
session_start();
$_SESSION['name'] = "";
if($_SESSION['name']){
    echo json_encode('error al cerrar sesion'); 
}
else{
    echo json_encode('nos vemos despues');
}