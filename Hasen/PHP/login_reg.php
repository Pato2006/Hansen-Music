<?php
include "env.php";

$usuario = $_POST["nombre"];
$contraseña = $_POST["contraseña"];
$hash = password_hash($contraseña, PASSWORD_DEFAULT);

$con = mysqli_connect(HOST, USER, PASSWORD, DB);
switch ($_POST["action"]) {
    case "login":
        $sql = "SELECT * FROM usuarios";
        $result = mysqli_query($con, $sql);

        if ($result) {
            $data = array();

            while ($row = mysqli_fetch_assoc($result)) {
                $data[] = $row;
            }
            // echo json_encode($data); para ver el array en json
        }
        mysqli_close($con);

        $contraseña_aparece = false;
        foreach ($data as $row) {
            if ($hash == $row['contraseña'] && $usuario == $row['nombre']) {
                $contraseña_aparece = true;
            } else {
            }
        }
        if ($contraseña_aparece) {
            echo "1";
        } else {
            echo "Algo ingresaste mal";
        }
        break;
    case "registrarse":
        $sql = "INSERT INTO usuarios (nombre, contraseña) VALUES ('$usuario', '$hash')";
        $result = mysqli_query($con, $sql);
        if ($result) {
            $usuario_id = mysqli_insert_id($con);
            $sql_informacion = "INSERT INTO usuarios_informacion (id) VALUES ('$usuario_id')";
            $result_informacion = mysqli_query($con, $sql_informacion);
            if ($result_informacion) {
                echo "1";
            } else {
                echo "Algo fallo";
            }
        }
        break;
}