$(document).ready(function () {
  $.ajax({
    url: "PHP/perfil.php",
    type: "POST",
    dataType: "json",
    async: false,
    success: function (data) {
      console.log(data);
      for (i = 0; i < data.length; i++) {
        $("#perfil").html(data[i].nombre_usuario);
        $("#correo").html(data[i].correo);
        $("#reputacion").html(data[i].reputacion);
        $("#envio").html(data[i].envio);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
});
