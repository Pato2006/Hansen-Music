<?php
require_once("env.php");

$publication_id = (int) $_POST['publication_id'];
$reason_main = $con->real_escape_string($_POST['motivo1']);
$comments = isset($_POST['comentario']) ? $con->real_escape_string($_POST['comentario']) : "";

$sql = "INSERT INTO reports (publication_id, Reason, Comment, report_date)
        VALUES ('$publication_id', '$reason_main', '$comments', NOW())";

if ($con->query($sql) === TRUE) {
    echo "Reporte guardado con éxito";
} else {
    http_response_code(500);
    echo "Error: " . $con->error;
}

$con->close();
?>