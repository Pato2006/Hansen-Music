function subir_datos() {
  nombre = document.getElementById("nombre").value;
  mail = document.getElementById("mail").value;
  entrega = document.getElementById("entregaDropdown").textContent;
  imagenPerfil  = document.getElementById("imagen_perfil");
  foto = imagenPerfil.src;

  if (nombre === "" || mail === "" || entrega === "") {
    alert("Ingresa datos")
    return
  }
  datos = {
    nombre, mail, entrega, foto
  };
  $.ajax({
    url: "PHP/perfil_subir.php",
    type: "POST",
    dataType: "text",
    data: datos,
    async: false,
    success: function (data) {
      alert(data.foto)
      // window.location.href = "index.html"
    },
    error: function (data) {
      alert(data)
    },
  });
}
