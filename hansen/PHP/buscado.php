<?php
require_once "env.php";

$texto = isset($_POST['texto_buscar']) ? $_POST['texto_buscar'] : '';
$marca = isset($_POST['marca']) ? $_POST['marca'] : '';
$orientacion = isset($_POST['orientacion']) ? $_POST['orientacion'] : '';
$estado = isset($_POST['estado']) ? $_POST['estado'] : '';
$from = isset($_POST['from']) ? $_POST['from'] : '';
$to = isset($_POST['to']) ? $_POST['to'] : '';
$page = isset($_POST['page']) ? $_POST['page'] : 1;
$publicationsPerPage = 6;
$offset = ($page - 1) * $publicationsPerPage;


$sql = "SELECT publications.name, publications.state, publications.price, publications.id, products.name AS product, orientations.name AS orientation, brands.name AS brand
    FROM publications
    INNER JOIN products ON publications.product_id = products.id
    INNER JOIN brands ON products.brand_id = brands.id
    INNER JOIN orientations ON products.orientation_id = orientations.id
    WHERE publications.name LIKE '%" . $texto . "%'";

if (!empty($marca)) {
    $sql .= " AND brands.id = '$marca'";
}

if (!empty($from) && !empty($to)) {
    $sql .= " AND publications.price BETWEEN '$from' AND '$to'";
} else if (!empty($from) && empty($to)) {
    $sql .= " AND publications.price >= '$from'";
}

if (!empty($orientacion)) {
    $sql .= " AND orientations.id = '$orientacion'";
}

if (!empty($estado)) {
    $sql .= " AND publications.state = '$estado'";
}

$sql .= " LIMIT $offset, $publicationsPerPage";

$result = mysqli_query($con, $sql);

if (!$result) {
    die("Error en la consulta principal: " . mysqli_error($con));
}

$publications = array();
while ($row = mysqli_fetch_assoc($result)) {
    $publications[] = $row;
}

require_once "marcas.php";
require_once "orientaciones.php";
require_once "product.php";
require_once "sends.php";

require_once "registros.php";

$response = [
    'brands' => $brands,
    'publications' => $publications,
    'orientations' => $orientations,
    'products' => $products,
    'sends' => $sends,
    'registros' => $totalCount,
    'totalpages' => ceil($totalCount / $publicationsPerPage),
];

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
?>