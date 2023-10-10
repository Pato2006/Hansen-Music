$(document).ready(function () {
  $.ajax({
    url: "PHP/perfil.php",
    type: "POST",
    dataType: "json",
    async: false,
    success: function (data) {
      console.log(data)
      var usuario = data[0];
      $("#perfil").html(usuario.nombre_usuario);
      var nombreUsuario = usuario.nombre;
      $("#correo").html(usuario.correo);
      $("#reputacion").html(usuario.reputacion);
      $("#envio").html(usuario.envio);
      var imagenes = data.imagenes;
      for (var i = 0; i < imagenes.length; i++) {
        var imagen = imagenes[i];
        if (nombreUsuario + ".png" === imagen) {
          $("#imagen_usuario").attr("src", "imagenes/"+imagen);
        }
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
});
