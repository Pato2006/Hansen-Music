$(document).ready(function () {
  $("#busqueda").click(function () {
    $.ajax({
      url: "PHP/buscado.php",
      type: "POST",
      dataType: "json",
      data: $("#buscador").serialize(),
      success: function (data) {
        console.log(data);
        str = ""
        for (i = 0; i < data.length; i++) {
          str += '<a href="" class="articulos">';
          str += '<div class="contenido">'
          str += '<div class="foto">'
          str += '<img src="img/guitarra.jpg" alt="instrumento">'
          str += '</div>'
          str += '<div class="descripcion">'
          str += "<h3>" + (data[i].nombre) + "</h3>";
          str += "<h3>" + "$" + (data[i].precio) + "</h3>";
          str += "</div>";
          str += "</div>";
          str += "</a>";
        }
        $("#productos").html(str);
      },
    });
  });
  // $(".marca").click(function () {
  //   producto = document.getElementById('marca').placeholder
  //   marca = $(this).text()
  //   busqueda(marca,producto);
  // })
  // $(".orientacion").click(function () {
  //   producto = document.getElementById('orientacion').placeholder
  //   orientacion = $(this).text()
  //   busqueda(orientacion,producto);
  // })
  // $(".estado").click(function () {
  //   producto = document.getElementById('condicion').placeholder
  //   estado = $(this).text()
  //   busqueda(estado,producto);
  // })
  // $(".plata").click(function () {
  //   producto = document.getElementById('precio').placeholder
  //   plata = $(this).text()
  //   busqueda(plata,producto);
  // })
});


// function busqueda(busqueda,producto){
//   $.ajax({
//     url: "PHP/filtros.php",
//     type: "POST",
//     dataType: "json",
//     data: { busquedas: busqueda, productos: producto },
//     async: false,
//     success: function (data) { 
//       str = ""
//       for (i = 0; i < data.length; i++) {
//         str += '<a href="" class="articulos">';
//         str += '<div class="contenido">'
//         str += '<div class="foto">'
//         str += '<img src="img/guitarra.jpg" alt="instrumento">'
//         str += '</div>'
//         str += '<div class="descripcion">'
//         str += "<h3>" + (data[i].nombre) + "</h3>";
//         str += "<h3>" + "$" + (data[i].precio) + "</h3>";
//         str += "</div>";
//         str += "</div>";
//         str += "</a>";
//       }
//       $("#productos").html(str);
//   },
//     error: function (data){
//       alert(data)
//     }
//   })
// }