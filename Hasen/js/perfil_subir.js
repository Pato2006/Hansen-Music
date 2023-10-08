var valorCookie = document.cookie.split('; ').find(row => row.startsWith('Usuario=')).split('=')[1];
console.log("Valor de la cookie:" + valorCookie);
// verificar la cookie anda

function subir_datos() {
  nombre = document.getElementById("nombre").value;
  mail = document.getElementById("mail").value;
  nombre_compañia = document.getElementById("nombre_compañia").value
  if (nombre_compañia) { }
  else {
    nombre_compañia = null
  }
  entrega = document.getElementById("entregaDropdown").textContent;

  if (nombre === "" || mail === "" || entrega === "") {
    alert("Ingresa datos")
    return
  }
  datos = {
    nombre, mail, nombre_compañia, entrega
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
