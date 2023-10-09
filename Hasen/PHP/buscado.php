<?php
include "env.php";
$con = mysqli_connect(HOST, USER, PASSWORD, DB);
$action = $_POST['texto_buscar'];
$sql = "SELECT * FROM productos WHERE nombre LIKE '%" . $action . "%'";
$result = mysqli_query($con, $sql);


if ($result) {
    $data = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
    echo json_encode($data);
}
