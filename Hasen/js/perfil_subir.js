function subir_datos() {
  datos = {
    nombre: document.getElementById("nombre").value,
    mail: document.getElementById("mail").value,
    nombre_compañia: document.getElementById("mail").value,
    entrega: document.getElementById("entregaDropdown").textContent,
  };
  $.ajax({
    url: "PHP/perfil_subir.php",
    type: "POST",
    dataType: "text",
    data: datos,
    async: false,
    success: function (data) {
        alert(data)
    },
    error: function (data) {
      

    },
  });
}
