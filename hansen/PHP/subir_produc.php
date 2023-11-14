<?php 
require_once ("env.php");

$name_producto = $_POST['nombre'];
$descripcion_producto = $_POST['descripcion'];
$marca = $_POST['brand_id'];
$estado = $_POST['estado_selec'];
$orien = $_POST['orientacion_selec'];
$producto = $_POST['product_selec'];
$entrega = $_POST['send_selec'];
$precio = $_POST['precio'];
session_start();

//subir la foto del producto

if (isset($_FILES['img_producto']) && $_FILES['img_producto'] != "") {
    $nombre_archivo = $_FILES['img_producto']['name'];
    $tipo_archivo = $_FILES['img_producto']['type'];
    $tamaño_archivo = $_FILES['img_producto']['size'];
    $archivo_temporal = $_FILES['img_producto']['tmp_name'];
    
} else {
 echo "no se puede subir un producto sin foto";
}



//confirmacion del inicio de seción y sacar el id
if (isset($_SESSION['name'])&& $_SESSION['name'] != "") {

    $sql1 = "SELECT id FROM users WHERE name = ?";
    $stmt = mysqli_prepare($con, $sql1);
    mysqli_stmt_bind_param($stmt, "s", $_SESSION['name']);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    if ($resultado) {
        $datos = mysqli_fetch_assoc($resultado);
        $vendedor = $datos['id'];

        $sql2 = "INSERT INTO publications ( seller_id, product_id,  name, description,  price, state, send_id) VALUES ('$vendedor', '$producto' , '$name_producto', '$descripcion_producto', '$precio' , '$estado',  '$entrega')";
        $result2 = mysqli_query($con, $sql2);
        
        if ($result2) {
            require_once("subir_produc_img.php");
            echo '"gracias por publicar su producto"'; 
        } else {
            echo("algo salio mal");
        }

// echo mysqli_error($con);
    } else{
         echo ("algo salio mal");
    }

} else{
    echo"necesitas iniciar secion para subir publicaciones";
}


//loooooooooooooooooooool!!!