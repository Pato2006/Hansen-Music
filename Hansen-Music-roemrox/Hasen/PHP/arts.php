<?php
include "env.php";
$con = mysqli_connect(HOST, USER, PASSWORD, DB);
$sql = "SELECT * FROM productos";
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