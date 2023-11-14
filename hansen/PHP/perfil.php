<?php
require_once("env.php");
session_start();
$name = @$_SESSION['name'];
if ($name == "" || $name == null) {
    echo json_encode(array("error" => "No estas logeado"));
    exit;
}
$sql = "SELECT name, mail, location FROM users WHERE name = '$name'";
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

$sql = "SELECT publications.name AS publication, status.id AS status
FROM users
INNER JOIN buys ON users.id = buys.user_buyer_id 
INNER JOIN publications ON buys.publication_id = publications.id
INNER JOIN status 
ON status.id = buys.status_id
WHERE users.name = '$name'
";

$result = mysqli_query($con, $sql);
$data["productos"] = array(); 
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data["productos"][] = $row;
    }
}
$data["ventas"] = array();
$sql = "SELECT id,name FROM publications WHERE seller_id = (SELECT id FROM users WHERE name = '$name' OR mail = '$name')";
$result = mysqli_query($con, $sql);
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data["ventas"][] = $row;
    }
}

$imagenes = scandir('../imagenes/publicacion/');
$imagenname = array();

foreach ($imagenes as $archivo) {
    if (pathinfo($archivo, PATHINFO_EXTENSION) === 'png') {
        $imagenname[] = $archivo;
    }
}

$data['ventas_img'] = array();

foreach ($data['ventas'] as $venta) {
    $idVenta = $venta['id'];
    foreach ($imagenname as $imagen) {
        $imagenId = pathinfo($imagen, PATHINFO_FILENAME);
        if ($imagenId == $idVenta) {
            $data['ventas_img'][] = $imagen;
        }
    }
}



echo json_encode($data);
