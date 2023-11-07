$(document).ready(function () {
    $("#vende-btn").click(function (e) {
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
                                        <div class="subir-imagen" id="subirImagenDiv">
                                        </div>
                                        <div class="subir-imagen-input mb-3 text-center">
                                            <input type="file" class="form-control" name="img_producto" id="inputGroupFile01">
                                        </div>
                                        <div class="eliminar-imagen">
                                            <button type="button" class="btn btn-lg" id="borrar">Borrar imagen actual</button>
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
                                            
                                                <input type="hidden" name="produc_selec" id="produc_seleccionado" >
                                            </div>
                                            </div>
                                        </div>
                                        <div class="subir-ubicacion me-4">
                                            <div class="input-group">
                                                <button id="entregaDropdown" class="btn btn-outline-secondary dropdown-toggle"
                                                    type="button" data-bs-toggle="dropdown" aria-expanded="false">Entrega</button>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#"
                                                            onclick="seleccionarOpcion('entrega', 'En casa')">En casa</a></li>
                                                    <li><a class="dropdown-item" href="#"
                                                            onclick="seleccionarOpcion('entrega', 'Envio')">Envio</a></li>
                                                </ul>
                                                <input type="hidden" name="entrega_selec" id="entrega_seleccionado" name="envio">
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
                $("#subir_prod").click(function () {
                    var data = $("#form_subir").serializeArray();
                    $.ajax({
                        url: "php/subir_produc.php",
                        type: "POST",
                        dataType: "text",
                        data: data,
                        async: false,
                        success: function (asd) {
                            console.log(data);
                            alert (data);

                        }
                    })
                })

            },

        })
    });



});

