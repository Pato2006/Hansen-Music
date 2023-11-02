<?php
require_once "env.php";


$texto = isset($_POST['texto_buscar']) ? $_POST['texto_buscar'] : '';
$marca = isset($_POST['marca']) ? $_POST['marca'] : '';
$orientacion = isset($_POST['orientacion']) ? $_POST['orientacion'] : '';
$estado = isset($_POST['estado']) ? $_POST['estado'] : '';


$sql = "SELECT * FROM publications WHERE name LIKE '%" . $texto . "%'";
if (!empty($marca)) {
    $sql .= " AND brand = '$marca'";
}

if (!empty($orientacion)) {
    $sql .= " AND orientation = '$orientacion'";
}

if (!empty($estado)) {
    $sql .= " AND state = '$estado'";
}

$result = mysqli_query($con, $sql);

$publications = array();
if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $publications[] = $row;
    }
}

require_once "marcas.php";
require_once "orientaciones.php";

$response = [
    'brands' => $brands,
    'publications' => $publications,
    'orientations' => $orientations,
];
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
