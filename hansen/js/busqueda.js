$(document).ready(function () {
  marca_id = ""
  orientacion_id = ""
  estado = ""

  $(document).on('click', '.boton.estado', function () {
    estado = $(this).text();
    alert(estado);
    bus(marca_id, orientacion_id, estado)
  })


  $(document).on('click', '.boton.marca', function () {
    marca_id = $(this).attr("id");
    alert(marca_id);
    bus(marca_id, orientacion_id, estado)
  })

  $(document).on('click', '.boton.orientacion', function () {
    orientacion_id = $(this).attr("id");
    alert(orientacion_id);
    bus(marca_id, orientacion_id, estado)
  })


  $("#busqueda").click(function () {
    marca_id = ""
    orientacion_id = ""
    estado = ""
    bus(marca_id, orientacion_id, estado);
  });

  $("#buscador").on("keypress", function (e) {
    marca_id = ""
    orientacion_id = ""
    if (e.keyCode === 13) {
      e.preventDefault();
      bus(marca_id, orientacion_id);
    }
  });
});

function bus(marca_id, orientacion_id) {
  $.ajax({
    url: "php/buscado.php",
    type: "POST",
    dataType: "json",
    data: {
      texto_buscar: $("#buscador").val(),
      marca: marca_id,
      orientacion: orientacion_id,
      estado: estado
    },
    success: function (data) {
      console.log(data);

      str = `
          <main class="products">
          
            <div class="filtro d-flex flex-column">
                <div class="marca"> 
                    <input type="text" class="text" placeholder="Marca" disabled id="marca">
            
                    `

      $.each(data["brands"], function (index, brands) {
        str += '<button id=' + brands.id + ' class="boton marca">' + brands.name + '</button>';
      });



      str += ` </div>
                <div class="Orientacion">
                    <input type="text" class="iten" placeholder="Orientacion" disabled id="orientacion">
                    <button id="1" class="boton orientacion">Diestro</button>
                    <button id="2" class="boton orientacion">Zurdo</button>
                    <button id="3" class="boton orientacion">Ambidiestro</button>    
                </div>
                <div class="Estado">
                    <input type="text" class="iten" placeholder="Estado" disabled id="condicion">
                    <button class="boton estado">Nuevo</button>
                    <button class="boton estado">Usado</button>    
                </div>
                <div class="Dinero">
                    <input type="text" class="iten" placeholder="Precio" disabled id="precio">
                    <button class="boton clase">Hasta $100.000</button>
                    <button class="boton clase">entre $100.000 y $200.000</button>
                    <button class="boton clase" id="plata_entre">Más de $200.000</button>    
                </div>
                <div class="precio-producto">
                    <input type="number" class="precio-boton">
                    <div class="precio-espacio"></div>
                    <input type="number" class="precio-boton m-0">
                    <button class="send"><img src="img-svg/box-arrow-in-right.svg" alt="Precio"></button>
                </div>
            </div>
            `;
      str += `
            <div class="articulos d-flex justify-content-center flex-wrap" id="productos">   `;
      for (i = 0; i < data["publications"].length; i++) {

        str += '<a href="#" class="articulos">';
        str += '<div class="contenido" onclick="clickeado(' + data["publications"][i].id + ')">';
        str += '<div class="foto">';
        str += '<img src="img/guitarra.jpg" alt="instrumento">';
        str += "</div>";
        str += '<div class="descripcion">';
        str += "<h3>" + data["publications"][i].name + "</h1>";
        str += "<h3>" + "$" + data["publications"][i].price + "</h4>";
        str += "</div>";
        str += "</div>";
        str += "</a>";

      }

      str += `
            </div>
            </div>
            
          </main>                    
        `
      str += `<div id="paginator" class="paginator">
        <button onclick="previousPage()"><</button>
        <div id="buttons" class="button-container">
            <!-- Los botones se generan dinámicamente con JavaScript -->
        </div>
        <button onclick="nextPage()">></button>
    </div> `

      $("#contenedor").html(str);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // Handle the error here
      console.error("AJAX request failed: " + errorThrown);
    }
  });
}
function clickeado(id) {
  $.ajax({
    url: "php/clickeado.php",
    type: "POST",
    dataType: "json",
    data: { id: id },
    async: false,
    success: function (data) {
      str =
        `
      <main class="fondo-black">
      <div class="container">
          <div class="fondo-contenido d-flex align-items-start justify-content-center">
              <section class="subir-producto">
                  <div class="subir-imagen" id="subirImagenDiv">
                      <div id="carouselExampleIndicators" class="carousel slide">
                          <div class="carousel-indicators">
                              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                  class="active" aria-current="true" aria-label="Slide 1"></button>
                              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                  aria-label="Slide 2"></button>
                              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                  aria-label="Slide 3"></button>
                          </div>
                          <div class="carousel-inner">
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
                  <div class="subir-titulo">
                      <div class="mb-3 align-items-center">
                          <section class="rounded">
                              <h1>` + data[0].name + `</h1>
                              <h3 id="penoso">★★★★✰</h3>
                              <h2>$`+ data[0].price + `</h2>
                          </section>
                      </div>
                  </div>
                  <div class="subir-descripcion ml-4">
                      <div class="input-group input-group-lg mb-3 align-items-center ">
                          <section class="rounded">

                          </section>
                      </div>
                  </div>
                  <div class="subir-filtros mb-5 me-auto">
                      <div class="subir-boton d-flex-normal justify-content-center align-items-center " id="lol">
                          <button class="btn w-100 h-100" type="button">Comprar</button>

                          <div class="subir-boton d-flex-normal justify-content-center align-items-center" id="sos">
                              <button id="sosas" class="btn w-100 h-100" type="button">Añadir al carrito (2)</button>
                          </div>
                      </div>
                      <div class="subir-envio">

              </section>
          </div>
          
      </div>
      
  </main>`;

      $("#contenedor").html(str);
    },
    error: function (error) {
      alert(error);
    },
  });
}


