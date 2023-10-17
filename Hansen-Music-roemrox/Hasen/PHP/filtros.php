<?php
include "env.php";
$con = mysqli_connect(HOST, USER, PASSWORD, DB);
$busqueda = $_POST['busquedas'];
$producto = $_POST['productos'];
$sql = "SELECT * FROM productos WHERE $producto = $busqueda";
$result = mysqli_query($con, $sql);

if ($result) {
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
    echo json_encode($data);
}
