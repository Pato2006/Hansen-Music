<?php
require_once "env.php";
session_start();
$user = @$_SESSION['username'];
$borrar_img = "../imagenes/perfil/$user.png";

try {
    $sql = "DELETE FROM username WHERE name = '$user' OR mail = '$user'";
    $result = mysqli_query($con, $sql);

    if ($result) {
        $data = array();
        $data[] = "Tu cuenta se borró satisfactoriamente";
        $_SESSION['name'] = "";

        if (file_exists($borrar_img)) {
            if (unlink($borrar_img)) {
            } else {
            }
        } else {
        }
    } else {
        $data[] =  "Algo salió mal, puede ser que realizaste una compra o tengas una publicacion activa";
    }
} catch (mysqli_sql_exception $e) {
    $data[] = "Error al borrar la cuenta, pobablemente tengas una publicacion activa o hayas comprado un producto";
}

mysqli_close($con);
echo json_encode($data);
