
$(document).ready(function () {
    $("#vende-btn").click(function (e) {

        $.ajax({
            url: "php/prohibicion.php", // Ruta para verificar la sesión
            type: "POST",
            dataType: "json",
            success: function (secion) {
                if (secion.estado === "activo") {
                    // La sesión está activa, continuar con la construcción de la página
                    hacerPag();
                } else {
                    // La sesión no está activa, mostrar un alert
                    alert("Debes estar logeado para vender un producto");
                }
            },
            error: function () {
                // Error al verificar la sesión, manejar según sea necesario
                alert("Debes iniciar secion para vender un producto");
            }
        });
 


        function hacerPag(){
        e.preventDefault()
        $.ajax({
            url: "php/buscado.php",
            type: "POST",
            dataType: "json",
            success: function (data) {
                console.log(data);
                str = `
                        <main class="fondo-black">
                        <div class="container">
                            <div class="fondo-contenido d-flex align-items-start justify-content-center">
                                <form action="#" method="POST" id="form_subir">
                                    <section class="subir-producto">
                                            <img id="imagenSeleccionada" class="subir-imagen" src="" alt="Imagen seleccionada">
                                            <div class="subir-imagen-input mb-3 text-center">
                                               <input type="file" class="form-control" name="img_producto" id="inputGroupFile01" onchange="Fotopubli()">
                                            </div>
                                            <div class="eliminar-imagen">
                                                <button type="button" class="btn btn-lg" id="borrar" onclick="Borrarimgpubli()">Borrar imagen actual</button>
                                            </div>
                                        <div class="subir-titulo">
                                            <div class="mb-3 align-items-center">
                                                <section class="rounded">
                                                    <input type="text" class="form-control form-control-lg"
                                                        placeholder="nombre del producto" id="nombre_producto" name="nombre">
                                                </section>
                                            </div>
                                        </div>
                                        <div class="subir-descripcion ml-4">
                                            <div class="input-group input-group-lg mb-3 align-items-center ">
                                                <section class="rounded">
                                                    <input type="text" class="form-control form-control-lg"
                                                        placeholder="Descripcion del producto" id="descrip_producto" name="descripcion">
                                                </section>
                                            </div>
                                        </div>
                                        <div class="subir-filtros mb-5 me-auto">
                                            <div class="input-group">
                                                <button id="brandDropdown" class="btn btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Marca</button>
            
                                                <ul class="dropdown-menu">
                                                    
                                                `
                                                 $.each(data["brands"], function (index, brand) {

                                                str += `<li><a  class="dropdown-item" href="#"onclick="seleccionarOpcion('brand', '` + brand.id + `')">` + brand.name + `</a></li>`

                                                });
                                                 str += `</ul>
                                                
                                                <input type="hidden" name="brand_id" id="brand_seleccionado">

                                            </div>
                                            <div class="input-group">
                                                <button id="estadoDropdown" class="btn btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Estado</button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"
                                                            onclick="seleccionarOpcion('estado', 'Nuevo')">Nuevo</a></li>
                                                    <li><a class="dropdown-item" href="#"
                                                            onclick="seleccionarOpcion('estado', 'Usado')">Usado</a></li>
                                                </ul>
                                                <input type="hidden" name="estado_selec" id="estado_seleccionado" name="estado">
                                            </div>
                                            <div class="input-group">
                                                <button id="orientacionDropdown" class="btn btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Orientación</button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"
                                                            onclick="seleccionarOpcion('orientacion', 'Zurdo')">Zurdo</a></li>
                                                    <li><a class="dropdown-item" href="#"
                                                            onclick="seleccionarOpcion('orientacion', 'Diestro')">Diestro</a></li>
                                                </ul>
                                                <input type="hidden" name="orientacion_selec" id="orientacion_seleccionado"
                                                    name="orien">

                                                    <div class="input-group">
                                                <button id="productDropdown" class="btn btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">producto</button>
                                                <ul class="dropdown-menu">
                                                `
                                                $.each(data["products"], function (index, product) {

                                                    str += `<li><a  class="dropdown-item" href="#"onclick="seleccionarOpcion('product', '` + product.id + `')">` + product.name + `</a></li>`
                                
                                                });
                                                str += `</ul>
                                            
                                                <input type="hidden" name="product_selec" id="product_seleccionado" >
                                            </div>
                                            </div>
                                        
                                        
                                            <div class="input-group">
                                                <button id="sendDropdown" class="btn btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Entrega</button>
                                                <ul class="dropdown-menu">
                                                `
                                                $.each(data["sends"], function (index, send) {

                                                    str += `<li><a  class="dropdown-item" href="#"onclick="seleccionarOpcion('send', '` + send.id + `')">` + send.name + `</a></li>`
                                
                                                });
                                                str += `</ul>
                                                <input type="hidden" name="send_selec" id="send_seleccionado">
                                            </div>
                                        </div>
                                        <div class="subir-precio">
                                            <div class="input-group input-group-lg mb-3 align-items-center">
                                                <section class="rounded">
                                                    <input type="number" class="form-control form-control-lg" placeholder="Precio"
                                                        id="precio" name="precio">
                                                </section>
                                            </div>
                                        </div>
                                        <div class="subir-boton d-flex-normal justify-content-center align-items-center">
                                            <button class="btn w-100 h-100" type="submit" id="subir_prod">Subir</button>
                                        </div>
                                    </section>
                                </form>
                            </div>
                        </div>
                        </main>`;
                $("#contenedor").html(str)
                $("#form_subir").submit(function (event) {
                    event.preventDefault();
                    var formData = new FormData(this);
                    $.ajax({
                        url: "php/subir_produc.php",
                        type: "POST",
                        dataType: "text",
                        data: formData,
                        contentType: false,
                        processData: false,
                        success: function (asd) {
                            console.log(formData);
                            alert(asd);
                            
                        }
                    });
                });
            }
        });
    }
    });
});
function Fotopubli() {
    var input = document.getElementById("inputGroupFile01");
    var imagenSeleccionada = document.getElementById("imagenSeleccionada");

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imagenSeleccionada.src = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function Borrarimgpubli() {
    var imagenSeleccionada = document.getElementById("imagenSeleccionada");
    imagenSeleccionada.src = ""; // Limpia la imagen al hacer clic en "Borrar imagen actual"
}
