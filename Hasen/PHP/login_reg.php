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
            if (password_verify($contraseña, $row['contraseña']) && $usuario == $row['nombre'] || $usuario == $row['correo']) {
                $contraseña_aparece = true;
                session_start();
                $_SESSION['nombre'] = $row['nombre'];
                break;
            }
        }

        if ($contraseña_aparece) {
            echo "1";
        } else {
            echo "Usuario o contraseña incorrectos";
        }
        break;
        case "registrarse":
        $sql = "INSERT INTO usuarios (nombre, contraseña) VALUES ('$usuario', '$hash')";
        $result = mysqli_query($con, $sql);
        if ($result) {
            echo "1";
        } else {
            echo "Algo fallo";
        }
        break;
}
