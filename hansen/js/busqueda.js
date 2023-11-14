$(document).ready(function () {
  marca_id = ""
  orientacion_id = ""
  estado = ""
  from = ""
  to = ""
  startPage = 1
  currentPage = 1;
  maxpag = 20;
  historyStack = [];

  renderButtons();

  $(document).on('click', '.boton.estado', function () {
    currentPage = 1;
    estado = $(this).text();
    alert(estado);
    bus(marca_id, orientacion_id, estado, from, to)
  })

  $(document).on('click', '.enviar.precio', function () {
    currentPage = 1;
    from = document.getElementById("desde").value
    to = document.getElementById("hasta").value
    alert(from + " " + to);
    bus(marca_id, orientacion_id, estado, from, to)
  })

  $(document).on('click', '.boton.precio', function (e) {
    currentPage = 1;
    e.preventDefault()
    from = $(this).attr("from");
    to = $(this).attr("to");
    alert(from + " " + to);
    bus(marca_id, orientacion_id, estado, from, to)
  })



  $(document).on('click', '.boton.marca', function () {
    currentPage = 1;
    marca_id = $(this).attr("id");
    alert(marca_id);
    bus(marca_id, orientacion_id, estado, from, to)
  })

  $(document).on('click', '.boton.orientacion', function () {
    currentPage = 1;
    orientacion_id = $(this).attr("id");
    alert(orientacion_id);
    bus(marca_id, orientacion_id, estado, from, to)
  })


  $("#busqueda").click(function () {
    currentPage = 1;
    marca_id = ""
    orientacion_id = ""
    estado = ""
    from = ""
    to = ""
    bus(marca_id, orientacion_id, estado, from, to);
  });

  $("#buscador").on("keypress", function (e) {
    currentPage = 1;
    marca_id = ""
    orientacion_id = ""
    estado = ""
    from = ""
    to = ""
    if (e.keyCode === 13) {
      e.preventDefault();
      bus(marca_id, orientacion_id, estado, from, to);
    }
  });
  console.log(maxpag)
});


//Funcion listado
function bus(marca_id, orientacion_id, estado, from, to) {
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
      updatemaxpag(data.totalpages)

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
                    <button from="0" to="1000" class="boton precio">Hasta $1000</button>
                    <button from="500" to="1000" class="boton precio">entre $500 y $1000</button>
                    <button from="1000" to=""  class="boton precio" id="plata_entre">Más de $1000</button>    
                </div>
                <div class="precio-producto">
                    <input type="number" id="desde" class="precio-boton" placeholder="">
                    <div class="precio-espacio"></div>
                    <input type="number" id="hasta" class="precio-boton m-0" placeholder="">
                    <button type="button" class="enviar precio"><img src="imagenes/svg/box-arrow-in-right.svg" alt="Precio"></button>
                </div>
            </div>
            `;
      str += `
            <div class="container">
              <div class="row">
            `;

      for (i = 0; i < data["publications"].length; i++) {
        if (i % 2 === 0) {
          str += `</div><div class="row">`;
        }

        str += `
              <div class="col-md-6">
                <div class="">
                  <div class="contenido_contenedor">
                    <a href="#" class="articulos">
                      <div class="contenido" onclick="clickeado(${data["publications"][i].id})">
                        <div class="foto">
                          <img src="imagenes/publicacion/${data["publications"][i].id}.png" alt="">
                        </div>
                        <div class="descripcion">
                          <h3><strong>${data["publications"][i].name}</strong></h3>
                          <h4><strong>$${data["publications"][i].price}</strong></h4>
                          <h5>Modelo: ${data["publications"][i].product}</h5>
                          <h5>Marca: ${data["publications"][i].brand}</h5>
                          <h5>Orientacion: ${data["publications"][i].orientation}</h5>
                          <h5>Estado: ${data["publications"][i].state}</h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              `;
      }

      str += `
            </div>
            </div>
            
            
            
          </main>                    
        `
      str += `<div id="paginator" class="paginator">
        <button onclick="previousPage()"><</button>
        <div id="boton_p" class="paginador button-container">
        ${renderButtons()}
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
    data: { id: id,
     },
    async: false,
    success: function (data) {
      console.log(data)
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
                              <h2>$`+ data[0].price + `</h2>
                              <p>Tipo de entrega: `+ data[0].sends + `</p>
                              <p>Descripcion: `+ data[0].description + `</p>
                              <p>Estado: `+ data[0].state + `</p>
                              <p>Orientacion: `+ data[0].orientation + `</p>
                              <p>Producto: `+ data[0].product + `</p>
                              <p>Vendedor: `+ data[0].seller + `</p>

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
                      <div class="subir-boton d-flex-normal justify-content-center align-items-center " id="lol">
                          <button class="btn w-100 h-100" type="button" id="comprar-prod">Comprar</button>
                      </div>
                      <div class="subir-envio">
              </section>
          </div>
          
      </div>
      
  </main>`;

      $("#contenedor").html(str);
      for(i = 0; i < data.imagenes.length; i++){
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
              window.location.href = "index.php";
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
}

//Funciones para el paginador
function renderButtons() {

  buttonsHTML = '';

  if (currentPage !== 2 && currentPage !== 0 && currentPage !== 1) {
    buttonsHTML += `<button id="1" onclick="changePage(1)">1</button>`;
  }

  // Botón anterior al currentPage
  if (currentPage > 1 && maxpag > 2 && maxpag > 3 && currentPage != maxpag && currentPage != maxpag - 1 && maxpag > 1) {
    buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
  }
  else if (maxpag == 2) {
    if (currentPage == maxpag) {
      buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`
    }
  }
  else if (maxpag == 3) {
    if (currentPage == 3) {
      buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`
    }
    else if (currentPage == 2) {
      buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`
    }
  }
  else if (currentPage == maxpag - 1) {
    buttonsHTML += `<button id="${currentPage - 2}" onclick="changePage(${currentPage - 2})">${currentPage - 2}</button>`;
    buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
  }
  else if (currentPage == maxpag && maxpag != 1) {
    buttonsHTML += `<button id="${currentPage - 3}" onclick="changePage(${currentPage - 3})">${currentPage - 3}</button>`;
    buttonsHTML += `<button id="${currentPage - 2}" onclick="changePage(${currentPage - 2})">${currentPage - 2}</button>`;
    buttonsHTML += `<button id="${currentPage - 1}" onclick="changePage(${currentPage - 1})">${currentPage - 1}</button>`;
  }

  // Botón actual (currentPage)
  buttonsHTML += `<button id="${currentPage}" onclick="changePage(${currentPage})">${currentPage}</button>`

  // Botón siguiente al currentPage
  if (currentPage < maxpag && maxpag > 2 && maxpag > 3 && maxpag > 1) {
    if (currentPage != 2 && currentPage != 1) {
      buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`
    }
    else {
      if (currentPage == 1 && maxpag != 1) {
        buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`
        buttonsHTML += `<button id="${currentPage + 2}" onclick="changePage(${currentPage + 2})">${currentPage + 2}</button>`
        buttonsHTML += `<button id="${currentPage + 3}" onclick="changePage(${currentPage + 3})">${currentPage + 3}</button>`
      }
      else if (currentPage == 2) {
        buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`
        buttonsHTML += `<button id="${currentPage + 2}" onclick="changePage(${currentPage + 2})">${currentPage + 2}</button>`
      }
    }
  }
  else if (maxpag == 2) {
    if (currentPage == 1) {
      buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`
    }
  }
  else if (maxpag == 3) {
    if (currentPage == 1) {
      buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`
      buttonsHTML += `<button id="${currentPage + 2}" onclick="changePage(${currentPage + 2})">${currentPage + 2}</button>`
    }
    else if (currentPage == 2) {
      buttonsHTML += `<button id="${currentPage + 1}" onclick="changePage(${currentPage + 1})">${currentPage + 1}</button>`
    }
  }



  // Último botón, excepto cuando maxpag es 2 o currentPage es maxpag - 1 o maxpag
  if (maxpag !== 2 && currentPage !== maxpag - 1 && currentPage !== maxpag && maxpag != 0 && maxpag != 3) {
    buttonsHTML += `<button id="${maxpag}" onclick="changePage(${maxpag})">${maxpag}</button>`
  }


  return buttonsHTML

  console.log(currentPage)
}

function updatemaxpag(totalpages) {
  maxpag = totalpages;
  renderButtons();
}

function changePage(pageNumber) {
  if (pageNumber !== currentPage) {
    historyStack.push(currentPage);
    currentPage = pageNumber;
    bus(marca_id, orientacion_id, estado, from, to)
  }
  console.log(currentPage)
}

function nextPage() {
  if (currentPage < maxpag) {
    if (historyStack.length === 0 || historyStack[historyStack.length - 1] !== currentPage) {
      historyStack.push(currentPage);
    }
    currentPage += 1;
    bus(marca_id, orientacion_id, estado, from, to)
  }
  console.log(currentPage)
}

function previousPage() {
  if (currentPage > 1) {
    currentPage -= 1;
  }
  bus(marca_id, orientacion_id, estado, from, to)
  console.log(currentPage)
}