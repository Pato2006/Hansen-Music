<?php
require_once "env.php";
session_start();

$data = [];

try {
    $sql = "SELECT * FROM reports";
    $result = mysqli_query($con, $sql);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
    } else {
        $data[] = ["error" => "No se pudo ejecutar la consulta"];
    }

} catch (mysqli_sql_exception $e) {
    $data[] = ["error" => "Error MySQL: " . $e->getMessage()];
}

echo json_encode($data);
exit;
