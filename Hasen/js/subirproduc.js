
function productosubir(){
    
    producto={
        nombre: document.getElementById("nombre_producto").value ,
        descripcion: document.getElementById("descrip_producto").value,
        ubicacion:document.getElementById("ubicacion").value,
        precio : document.getElementById("precio").value
    }

    $.ajax({
        url:"PHP/subir_produc.php",
        type: "POST",
        dataType: "text",
        data: producto,
        async: false,
        success: function () {
            alert()
        }
    })
}