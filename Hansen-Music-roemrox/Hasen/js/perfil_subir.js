$(document).ready(function () {
  $("#actualizar").click(function () {
    if (document.getElementById("nombre").value === "" || document.getElementById("mail").value === "" || document.getElementById("entregaDropdown").textContent === "") {
      alert("Ingresa datos")
      return
    }
    $.ajax({
      url: "PHP/perfil_subir.php",
      type: "POST",
      dataType: "text",
      data: $("#form_actualizar").serialize(),
      async: false,
      success: function (data) {
        alert(data)
        window.location.href = "index.html"
      },
      error: function (data) {
        alert(data)
      },
    });
  })
})
