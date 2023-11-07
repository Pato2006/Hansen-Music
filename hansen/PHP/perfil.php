<?php
require_once("env.php");
session_start();
$name = @$_SESSION['name'];
if ($name == "" || $name == null) {
    echo json_encode(array("error" => "No estas logeado"));
    exit;
}
$sql = "SELECT name, mail, location FROM users";
$result = mysqli_query($con, $sql);

if ($result) {
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}
$imagenname = array();
$directorio = '../imagenes/perfil/';
$imagen_buscar = $name . ".png";
$archivos = scandir($directorio);
if ($archivos) {
    foreach ($archivos as $archivo) {
        if ($archivo == $imagen_buscar) {
            $imagenname[] = $archivo;
        }
    }
}

$data['imagenes'] = $imagenname;
echo json_encode($data);
