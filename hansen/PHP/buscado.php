<?php
require_once "env.php";

$texto = isset($_POST['texto_buscar']) ? $_POST['texto_buscar'] : '';

$marca = isset($_POST['marca']) ? $_POST['marca'] : '';

$orientacion = isset($_POST['orientacion']) ? $_POST['orientacion'] : '';

$estado = isset($_POST['estado']) ? $_POST['estado'] : '';

$sql = "SELECT publications.name, publications.price, orientations.name AS orientation, brands.name AS brand

        FROM publications

        INNER JOIN products ON publications.product_id = products.id
        INNER JOIN brands ON products.brand_id = brands.id
        INNER JOIN orientations ON products.orientation_id = orientations.id
        
        WHERE publications.name LIKE '%" . $texto . "%'";

if (!empty($marca)) {
    $sql .= " AND brands.id = '$marca'";
}

if (!empty($orientacion)) {
    $sql .= " AND orientations.id = '$orientacion'";
}

if (!empty($estado)) {
    $sql .= " AND publications.state = '$estado'";
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
require_once "product.php";
$response = [
    'brands' => $brands,
    'publications' => $publications,
    'orientations' => $orientations,
    'products' => $products,
];
header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
