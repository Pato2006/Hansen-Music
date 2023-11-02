<?php
require_once "env.php";
session_start();
$user = @$_SESSION['name'];
$sql = "DELETE FROM users WHERE name = '$user'";

$borrar_img = "../imagenes/$user.png";

$result = mysqli_query($con, $sql);
if ($result) {
    $data = array();
    $data[] = "Tu cuenta se borro satisfactoriamente";
    $_SESSION['name'] = "";
    if (file_exists($borrar_img)) {
        if (unlink($borrar_img)) {
        } else {
        }
    } else {
    }
} else {
    $data[] =  "Algo salio mal";
}
mysqli_close($con);
echo json_encode($data);
