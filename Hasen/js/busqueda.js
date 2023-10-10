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
});
