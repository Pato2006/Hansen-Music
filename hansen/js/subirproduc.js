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
                                            <div id="carouselExampleIndicators" class="carousel slide">
                                                <div class="carousel-indicators">
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="0" class="active" aria-current="true"
                                                        aria-label="Slide 1"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                </div>
                                                <div class="car
                                                ousel-inner">
                                                    <div class="carousel-item active">
                                                        <img src="img-svg/plus-lg.svg" class="d-block w-100" alt="Plus Icon" id="img1">
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="img-svg/plus-lg.svg" class="d-block w-100" alt="Plus Icon" id="img2">
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="img-svg/plus-lg.svg" class="d-block w-100" alt="Plus Icon" id="img3">
                                                    </div>
                                                </div>
                                                <button class="carousel-control-prev" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Previous</span>
                                                </button>
                                                <button class="carousel-control-next" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="subir-imagen-input mb-3 text-center">
                                            <input type="file" class="form-control" id="inputGroupFile01">
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

                    str += `<li><a  class="dropdown-item" href="#"onclick="seleccionarOpcion('brand', '` + brand.id + `')">` + brand.brand + `</a></li>`

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
                                        <div class="subir-envio">
                                            <div class="input-group input-group-lg mb-3 align-items-center ms-2">
                                                <section class="rounded">
                                                    <input type="text" class="form-control form-control-lg w-100"
                                                        placeholder="Ubicacion(opcional)" id="ubicacion" name="ubicacion">
                                                </section>
                                            </div>
                                        </div>
                                        <div class="subir-precio">
                                            <div class="input-group input-group-lg mb-3 align-items-center">
                                                <section class="rounded">
                                                    <input type="text" class="form-control form-control-lg" placeholder="Precio"
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
                            console.log(asd);
                        }
                    })
                })

            },

        })
    });



});

