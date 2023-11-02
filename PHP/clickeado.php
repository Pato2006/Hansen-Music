<?php
require_once  ("env.php");
$id = $_POST['id'];
$sql = "SELECT * FROM publications WHERE id = $id";
$result = mysqli_query($con,$sql);
if($result){
    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    mysqli_close($con);
    echo json_encode($data);
}
