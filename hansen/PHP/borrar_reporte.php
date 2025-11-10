<?php
include_once("env.php");
$id = $_POST['idreporte'];
$sql = "DELETE FROM reports WHERE id = '$id'";
$result = mysqli_query($con, $sql);
if ($result) {
    echo json_encode("El reporte ha sido borrado con éxito");
} else {
    echo "Algo salió mal";
}
?>
