$(document).ready(function () {


$(document).on("click", ".borrar-reporte", function() {
    const id = $(this).data("id");
    if (confirm("¿Seguro que querés borrar este reporte?")) {
        $.ajax({
            url: "PHP/borrar_reporte.php",
            type: "POST",
            data: { idreporte: id },
            dataType: "json",
            success: function(res) {
                alert(res);
                reportes();
            },
            error: function() {
                alert("Error al borrar el reporte");
            }
        });
    }
});


$(document).on("click", ".borrar-pub", function() {
    const id = $(this).data("id");
    if (confirm("¿Seguro que querés borrar esta publicación?")) {
        $.ajax({
            url: "PHP/borrar_publi.php",
            type: "POST",
            data: { idpubli: id },
            dataType: "json",
            success: function(res) {
                alert(res);
                const layoutType = ($("#buscador").css('display') === 'none') ? 'simplified' : 'full';
                bus(marca_id, orientacion_id, estado, from, to, layoutType);
            },
            error: function() {
                alert("Error al borrar la publicación");
            }
        });
    }
});
$("#navbar-zarpado").append(`
    <button type="button" id="reportes" class="btn btn-danger btn-lg fw-bold ms-3" onclick="reportes()">
        Reportes
    </button>
`);
    // Initial AJAX call to check user roles
    $.ajax({
        url: "PHP/roles_id.php",
        type: "POST",
        dataType: "json",
        async: false, // Consider changing to true and handling the display in the success callback for better UX
        success: function (data) {
            console.log("User role:", data.roles);
            if (data.roles == 2) {

            } else if (data.roles == 1) {
                // Role 1: Display dynamic product cards without filters, using the simplified layout
                displayAdminViewWithProducts();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX error checking roles:", textStatus, errorThrown);
            // Fallback: If roles check fails, perhaps default to a guest view or show an error.
            // For now, let's just log the error.
        }
    });

    // Function to initialize product search and filtering for role 2
    function initializeProductSearch() {
        // Ensure the main content area is visible if it was hidden by another role check
        $('#contenedor').css('display', 'block');
        $("#buscador").css('display', 'block');
        $("#vende-btn").css("display", "block");
        $("#busqueda").css("display", "block");
        $("#navbar-zarpado").css("background-color", ""); // Reset navbar background

        // Global variables for search filters
        window.currentPage = 1;
        window.marca_id = "";
        window.orientacion_id = "";
        window.estado = "";
        window.from = "";
        window.to = "";
        window.maxpag = 20; // Default, will be updated by bus()
        window.historyStack = [];
        window.UltimaMarca = "";
        window.UltimoEstado = "";
        window.UltimaOrientacion = "";

        // Event Listeners for search and filters
        $("#busqueda").click(function () {
            currentPage = 1;
            marca_id = "";
            orientacion_id = "";
            estado = "";
            from = "";
            to = "";
            bus(marca_id, orientacion_id, estado, from, to, 'full'); // Pass 'full' layout type
        });

        $(document).on('click', '.boton.estado', function () {
            currentPage = 1;
            if (UltimoEstado == $(this).text()) {
                estado = "";
            } else {
                estado = $(this).text();
            }
            UltimoEstado = estado;
            alert(estado);
            bus(marca_id, orientacion_id, estado, from, to, 'full');
        });

        $(document).on('click', '.enviar.precio', function () {
            currentPage = 1;
            from = document.getElementById("desde").value;
            to = document.getElementById("hasta").value;
            alert(from + " " + to);
            bus(marca_id, orientacion_id, estado, from, to, 'full');
        });

        $(document).on('click', '.boton.precio', function (e) {
            currentPage = 1;
            e.preventDefault();
            from = $(this).attr("from");
            to = $(this).attr("to");
            alert(from + " " + to);
            bus(marca_id, orientacion_id, estado, from, to, 'full');
        });

        $(document).on('click', '.boton.marca', function () {
            currentPage = 1;
            if (UltimaMarca == $(this).attr("id")) {
                marca_id = "";
            } else {
                marca_id = $(this).attr("id");
            }
            UltimaMarca = marca_id;
            alert(marca_id);
            bus(marca_id, orientacion_id, estado, from, to, 'full');
        });

        $(document).on('click', '.boton.orientacion', function () {
            currentPage = 1;
            if (UltimaOrientacion == $(this).attr("id")) {
                orientacion_id = "";
            } else {
                orientacion_id = $(this).attr("id");
            }
            UltimaOrientacion = orientacion_id;
            alert(orientacion_id);
            bus(marca_id, orientacion_id, estado, from, to, 'full');
        });

        $("#buscador").on("keypress", function (e) {
            currentPage = 1;
            marca_id = "";
            orientacion_id = "";
            estado = "";
            from = "";
            to = "";
            if (e.keyCode === 13) {
                e.preventDefault();
                bus(marca_id, orientacion_id, estado, from, to, 'full');
            }
        });

        // Load initial products on page load for role 2
        bus(marca_id, orientacion_id, estado, from, to, 'full'); // Initial call with 'full' layout
    }

    // Function to display products for role 1 (admin view)
    function displayAdminViewWithProducts() {
        // Ensure the main content area is visible
        $('#contenedor').css('display', 'block');
        $("#buscador").css('display', 'none'); // Hide buscador for this role
        $("#vende-btn").css("display", "none");
        $("#busqueda").css("display", "none");
        $("#navbar-zarpado").css("background-color", "gray");

        // Global variables for search filters (initialized for bus function)
        window.currentPage = 1;
        window.marca_id = "";
        window.orientacion_id = "";
        window.estado = "";
        window.from = "";
        window.to = "";
        window.maxpag = 20; // Default, will be updated by bus()
        window.historyStack = [];
        window.UltimaMarca = "";
        window.UltimoEstado = "";
        window.UltimaOrientacion = "";

        // Call bus to load products using the 'simplified' layout
        bus(marca_id, orientacion_id, estado, from, to, 'simplified');
    }
});

// Funcion listado (now accepts a layoutType parameter)
function bus(marca_id, orientacion_id, estado, from, to, layoutType) {
    $.ajax({
        url: "php/buscado.php",
        type: "POST",
        dataType: "json",
        data: {
            texto_buscar: $("#buscador").val(),
            marca: marca_id,
            orientacion: orientacion_id,
            estado: estado,
            from: from,
            to: to,
            page: currentPage
        },
        success: function (data) {
            console.log(data);
            updatemaxpag(data.totalpages);

            let str = `<main class="products">`;

            if (layoutType === 'full') {
                // Render the full filter sidebar for role 2
                str += `
                    <div class="filtro d-flex flex-column">
                        <div class="marca">
                            <input type="text" class="text" placeholder="Marca" disabled id="marca">
                `;
                let marca_creado = false;
                $.each(data["brands"], function (index, brands) {
                    if (marca_id == brands.id && !marca_creado) {
                        str += `<button id="${brands.id}" class="boton marca boton-seleccionado">${brands.name}</button>`;
                        marca_creado = true;
                    } else {
                        str += `<button id="${brands.id}" class="boton marca">${brands.name}</button>`;
                    }
                });

                str += `
                        </div>
                        <div class="Orientacion">
                            <input type="text" class="iten" placeholder="Orientacion" disabled id="orientacion">
                `;
                let orientacion_creado = false;
                $.each(data["orientations"], function (index, orientations) {
                    if (orientacion_id == orientations.id && !orientacion_creado) {
                        str += `<button id="${orientations.id}" class="boton orientacion boton-seleccionado">${orientations.name}</button>`;
                        orientacion_creado = true;
                    } else {
                        str += `<button id="${orientations.id}" class="boton orientacion">${orientations.name}</button>`;
                    }
                });

                str += `
                        </div>
                        <div class="Estado">
                            <input type="text" class="iten" placeholder="Estado" disabled id="condicion">
                `;
                if (UltimoEstado == "Nuevo") {
                    str += `<button class="boton estado boton-seleccionado">Nuevo</button>`;
                    str += `<button class="boton estado">Usado</button>`;
                } else if (UltimoEstado == "Usado") {
                    str += `<button class="boton estado">Nuevo</button>`;
                    str += `<button class="boton estado boton-seleccionado">Usado</button>`;
                } else {
                    str += `<button class="boton estado">Nuevo</button>`;
                    str += `<button class="boton estado">Usado</button>`;
                }

                str += `
                        </div>
                        <div class="Dinero">
                            <input type="text" class="iten" placeholder="Precio" disabled id="precio">
                            <button from="1" to="1000" class="boton precio">Hasta $1000</button>
                            <button from="500" to="1000" class="boton precio">entre $500 y $1000</button>
                            <button from="1000" to="" class="boton precio" id="plata_entre">Más de $1000</button>
                        </div>
                        <div class="precio-producto">
                            <input type="number" id="desde" class="precio-boton" placeholder="${data.from}" min="1">
                            <div class="precio-espacio"></div>
                            <input type="number" id="hasta" class="precio-boton m-0" placeholder="${data.to}" min="1">
                            <button type="button" onclick="validarInputs()" class="enviar precio"><img src="imagenes/svg/box-arrow-in-right.svg" alt="Precio"></button>
                        </div>
                    </div>
                `;
            }

            str += `
                <div class="container">
                    <div class="row">
            `;

            for (let i = 0; i < data["publications"].length; i++) {
                str += `
                    <div class="col-md-6 mb-4">
                        <a href="#" class="articulos" onclick="clickeado_godmode(${data["publications"][i].id}); return false;">
                            <div class="contenido tarjeta-blanca">
                                <div class="foto">
                                    <img src="imagenes/publicacion/${data["publications"][i].id}.png" alt="instrumento">
                                </div>
                                <div class="info-texto">
                                    <h3>${data["publications"][i].name}</h3>
                                    <p><strong>Marca:</strong> ${data["publications"][i].brand}</p>
                                    <p><strong>Precio:</strong> $${data["publications"][i].price}</p>
                                    <p><strong>Estado:</strong> ${data["publications"][i].state}</p>
                                    <p><strong>Orientacion:</strong> ${data["publications"][i].orientation}</p>
                                    <p><strong>Modelo:</strong> ${data["publications"][i].product}</p>
                                    <button type="button" class="btn btn-danger borrar-pub" data-id="${data["publications"][i].id}">Borrar publicación</button>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
            }

            str += `
                        </div>
                    </div>
                </main>
            `;
            str += `<div id="paginator" class="paginator">
                <button onclick="previousPage()"><</button>
                <div id="boton_p" class="paginador button-container">
                ${renderButtons()}
                </div>
                <button onclick="nextPage()">></button>
            </div> `;

            $("#contenedor").html(str);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("AJAX request failed: " + errorThrown);
        }
    });
}


// Global variable for buttonsHTML (used by renderButtons, antB, actB, sigB)
let buttonsHTML = '';

//Funciones para el paginador
function renderButtons() {
    buttonsHTML = '';

    // Primer boton
    if (currentPage !== 2 && currentPage !== 0 && currentPage !== 1 && maxpag > 1) { // Added maxpag > 1 to prevent showing 1 if only one page
        buttonsHTML += `<button id="1" onclick="changePage(1)">1</button>`;
    }
    // Botón anterior al currentPage
    antB();
    // Boton actual (currentPage)
    actB();
    // Boton siguiente al currentPage
    sigB();

    // Último botón
    if (maxpag !== 2 && currentPage !== maxpag - 1 && currentPage !== maxpag && maxpag !== 0 && maxpag !== 1 && maxpag !== 3) {
        buttonsHTML += `<button id="${maxpag}" onclick="changePage(${maxpag})">${maxpag}</button>`;
    }
    return buttonsHTML;
}

// Botón anterior al currentPage
function antB() {
    if (currentPage > 1 && maxpag > 2 && maxpag > 3 && currentPage != maxpag && currentPage != maxpag - 1 && maxpag > 1) {
        buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
    } else if (maxpag === 2) {
        if (currentPage === maxpag) {
            buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
        }
    } else if (maxpag === 3) {
        if (currentPage === 3) {
            buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
        } else if (currentPage === 2) {
            buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
        }
    } else if (maxpag === 4) {
        if (currentPage === 4) {
            buttonsHTML += `<button id="${currentPage - 2}" onclick="changePage(${currentPage - 2})">${currentPage - 2}</button>`;
            buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
        }
        if (currentPage === 3) {
            buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
        } else if (currentPage === 2) {
            buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
        }
    } else if (currentPage === maxpag - 1 && maxpag > 1) { // Added maxpag > 1 check
        buttonsHTML += `<button id="${currentPage - 2}" onclick="changePage(${currentPage - 2})">${currentPage - 2}</button>`;
        buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
    } else if (currentPage === maxpag && maxpag !== 1) {
        buttonsHTML += `<button id="${currentPage - 3}" onclick="changePage(${currentPage - 3})">${currentPage - 3}</button>`;
        buttonsHTML += `<button id="${currentPage - 2}" onclick="changePage(${currentPage - 2})">${currentPage - 2}</button>`;
        buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
    }
}

// Botón actual (currentPage)
function actB() {
    buttonsHTML += `<button id="${currentPage}" class="active-page" onclick="changePage(${currentPage})">${currentPage}</button>`; // Added active-page class
}
// Botón siguiente al currentPage
function sigB() {
    if (currentPage < maxpag && maxpag > 2 && maxpag > 3 && maxpag > 1 && maxpag > 4) {
        if (currentPage !== 2 && currentPage !== 1) {
            buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
        } else {
            if (currentPage === 1 && maxpag !== 1 && maxpag !== 4) { // Re-added maxpag !== 1 check
                buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
                buttonsHTML += `<button id="${currentPage + 2}" onclick="changePage(${currentPage + 2})">${currentPage + 2}</button>`;
                buttonsHTML += `<button id="${currentPage + 3}" onclick="changePage(${currentPage + 3})">${currentPage + 3}</button>`;
            } else if (currentPage === 2) {
                buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
                buttonsHTML += `<button id="${currentPage + 2}" onclick="changePage(${currentPage + 2})">${currentPage + 2}</button>`;
            }
        }
    } else if (maxpag === 2) {
        if (currentPage === 1) {
            buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
        }
    } else if (maxpag === 3) {
        if (currentPage === 1) {
            buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
            buttonsHTML += `<button id="${currentPage + 2}" onclick="changePage(${currentPage + 2})">${currentPage + 2}</button>`;
        } else if (currentPage === 2) {
            buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
        }
    } else if (maxpag === 4) {
        if (currentPage === 1) {
            buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
            buttonsHTML += `<button id="${currentPage + 2}" onclick="changePage(${currentPage + 2})">${currentPage + 2}</button>`;
        } else if (currentPage === 2) {
            buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
        } else if (currentPage === 3) {
            buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`;
        }
    }
}

function updatemaxpag(totalpages) {
    maxpag = totalpages;
    // Re-render buttons immediately after maxpag is updated
    $('#boton_p').html(renderButtons());
}

function changePage(pageNumber) {
    if (pageNumber !== currentPage) {
        historyStack.push(currentPage);
        currentPage = pageNumber;
        // The `bus` function now needs to know which layout to use
        const layoutType = ($("#buscador").css('display') === 'none') ? 'simplified' : 'full';
        bus(marca_id, orientacion_id, estado, from, to, layoutType);
    }
    console.log("Current Page (changePage):", currentPage);
}

function nextPage() {
    if (currentPage < maxpag) {
        if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== currentPage) {
            historyStack.push(currentPage);
        }
        currentPage += 1;
        const layoutType = ($("#buscador").css('display') === 'none') ? 'simplified' : 'full';
        bus(marca_id, orientacion_id, estado, from, to, layoutType);
    }
    console.log("Current Page (nextPage):", currentPage);
}

function clickeado_godmode(id) {
  $.ajax({
    url: "PHP/roles_id.php",
    type: "POST",
    dataType: "json",
    async: false,
    success: function (data) {
      $.ajax({
        url: "php/clickeado.php",
        type: "POST",
        dataType: "json",
        data: {
          id: id,
        },
        async: false,
        success: function (data) {
          console.log(data[0])
          str =
            `
      <main class="fondo-black">
      <div class="container">
          <div class="fondo-contenido d-flex align-items-start justify-content-center">
              <section class="subir-producto">
                  <div class="subir-imagen" id="subirImagenDiv">
                    <img src="imagenes/svg/plus-lg.svg" class="d-block w-100" alt="Plus Icon" id="img1">
                  </div>
                  <div class="subir-titulo">
                      <div class="mb-3 align-items-center">
                          <section class="rounded">
                              <h1>` + data[0].name + `</h1>
                              <p>`+ data[0].seller + `</p>
                              <img class="romeror" src="imagenes/perfil/`+ data[0].seller + `.png">
                              <h2>$`+ data[0].price + `</h2>
                              <p>Tipo de entrega: `+ data[0].sends + `</p>
                              <p>Descripcion: `+ data[0].description + `</p>
                              <p>Estado: `+ data[0].state + `</p>
                              <p>Orientacion: `+ data[0].orientation + `</p>
                              <p>Producto: `+ data[0].product + `</p>
                              <p>Tipo de instrumento: `+ data[0].type + `</p>
                              <p>Stock: `+ data[0].stock + `</p>
                          </section>
                      </div>
                  </div>
                  <div class="subir-descripcion ml-4">
                      <div class="input-group input-group-lg  mb-3 align-items-center ">
                          <section class="rounded">

                          </section>
                      </div>
                  </div>
                  <div class="subir-filtros mb-5 me-auto">
                      <div class="subir-envio">
              </section>
          </div>
          
      </div>
      
  </main>`;

          $("#contenedor").html(str);
          for (i = 0; i < data.imagenes.length; i++) {
            if (data[0].id + '.png' == data.imagenes[i]) {
              var imageUrl = 'imagenes/publicacion/' + data.imagenes[i];
              $("#img1").attr("src", imageUrl);
            }
          }


          $("#comprar-prod").click(function () {
            $.ajax({
              url: "php/compra.php",
              type: "POST",
              dataType: "json",
              data: data[0],
              async: false,
              success: function (data) {
                if (data.message) {
                  alert(data.message);
                } else if (data.error) {
                  alert("Error: " + data.error);
                }
              }
            })
          })
        },
        error: function (error) {
          alert(error);
        },
      });
    },
    error: function () {
    }
  });
}

function previousPage() {
    if (currentPage > 1) {
        currentPage -= 1;
    }
    const layoutType = ($("#buscador").css('display') === 'none') ? 'simplified' : 'full';
    bus(marca_id, orientacion_id, estado, from, to, layoutType);
    console.log("Current Page (previousPage):", currentPage);
}

//Correccion al ingresar 0 en el filtrado por precio manual
function validarInputs() {
    var desdeInput = document.getElementById('desde');
    var hastaInput = document.getElementById('hasta');

    if (desdeInput.value === '' || parseFloat(desdeInput.value) < 1) { // Handle empty string and values less than 1
        desdeInput.value = '1';
    }

    if (hastaInput.value === '' || parseFloat(hastaInput.value) < 1) { // Handle empty string and values less than 1
        hastaInput.value = '1';
    }
    // Automatically trigger search after validation
    $('.enviar.precio').click();
}
function reportes() {
    $.ajax({
        url: "PHP/ver_reportes.php",
        type: "POST",
        dataType: "json",
        success: function (data) {
            let str = `
                <div class="reportes">
                    <h2 style="color:red;">Reportes</h2>
            `;

            if (!data || data.length === 0) {
                $("#contenedor").html(`
                    <div class="d-flex justify-content-center align-items-center" style="height:100vh;">
                        <h1 class="text-white display-1 fw-bold text-center">NO HAY REPORTES</h1>
                    </div>
                `);
                return;
            }

            let total = data.length;
            let processed = 0;

            for (let i = 0; i < total; i++) {
                let reporte = data[i];

                $.ajax({
                    url: "PHP/ver_cada_reporte.php",
                    type: "POST",
                    dataType: "json",
                    data: { id: reporte.publication_id },
                    success: function (pubData) {
                        if (pubData.length > 0 && !pubData[0].error) {
                            let pub = pubData[0];

                            $.ajax({
                                url: "PHP/clickeado.php",
                                type: "POST",
                                dataType: "json",
                                data: { id: reporte.publication_id },
                                success: function (detalleData) {
                                    if (detalleData && !detalleData.error) {
                                        let detalle = detalleData[0];
                                        let imagenes = detalleData.imagenes || [];
                                        let imgHTML = "";

                                        imagenes.forEach(img => {
                                            const nombre = img.split(".")[0];
                                            if (nombre == detalle.id) {
                                                imgHTML += `<img src="imagenes/publicacion/${img}" alt="${detalle.name}" width="100" style="margin:5px;">`;
                                            }
                                        });

                                        str += `
                                            <style>
                                                .pepe { font-size: 28px; }
                                            </style>
                                            <div class="reporte" style="border:1px solid #ccc; margin:10px; padding:10px;"> 
                                                <p class="pepe" style="color:white;">Publicación: ${detalle.name}</p>
                                                <p class="pepe" style="color:white">Descripción: ${detalle.description}</p>
                                                <p class="pepe" style="color:white">Precio:$${detalle.price}</p>
                                                <p class="pepe" style="color:white">Estado: ${detalle.state}</p>
                                                <p class="pepe" style="color:white">Tipo: ${detalle.type}</p>
                                                <p class="pepe" style="color:white">Marca:${detalle.brand}</p>
                                                <p class="pepe" style="color:white">Orientación: ${detalle.orientation}</p>
                                                <p class="pepe" style="color:white">Forma de envío: ${detalle.sends}</p>
                                                <p class="pepe" style="color:white">Vendedor: ${detalle.seller}</p>
                                                <p class="pepe" style="color:white">Razón del reporte: ${reporte.Reason || 'Sin razón'}</p>
                                                <p class="pepe" style="color:white">Comentario: ${reporte.Comment || 'Sin comentario'}</p>
                                                <p class="pepe" style="color:white">Fecha del reporte: ${reporte.report_date}</p>
                                                ${imgHTML ? `<div style="width:800px">Imágenes:<br>${imgHTML.replaceAll('width="100"', 'width="800"')}</div>` : `<p style="color:white"><em>Sin imágenes</em></p>`}
                                                <button class="borrar-reporte" data-id="${reporte.id}" style="background:red;color:white;padding:8px 12px;border:none;border-radius:5px;cursor:pointer;">Borrar reporte</button>
                                            </div>
                                        `;
                                    } else {
                                        str += `
                                            <div class="reporte">
                                                <h3 style="color:red;">Reporte ID: ${reporte.id}</h3>
                                                <p>Error al cargar detalles de la publicación.</p>
                                            </div>
                                        `;
                                    }
                                },
                                complete: function () {
                                    processed++;
                                    if (processed === total) {
                                        str += `</div>`;
                                        $("#contenedor").html(str);
                                    }
                                }
                            });
                        } else {
                            str += `
                                <div class="reporte">
                                    <h3 style="color:red;">Reporte ID: ${reporte.id}</h3>
                                    <p>Error al cargar publicación (ID ${reporte.publication_id})</p>
                                </div>
                            `;
                            processed++;
                            if (processed === total) {
                                str += `</div>`;
                                $("#contenedor").html(str);
                            }
                        }
                    }
                });
            }
        },
        error: function (jqXHR, textStatus) {
            $("#contenedor").html(`<p>Error al cargar los reportes: ${textStatus}</p>`);
        }
    });




}
