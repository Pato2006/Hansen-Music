function login() {
  usuario = {
    nombre: document.getElementById("typeEmailX").value,
    contraseña: document.getElementById("typePasswordX").value,
    action: "login"
  }

  $.ajax({
    url: "PHP/login_reg.php",
    type: "POST",
    dataType: "text",
    data: usuario,
    async: false,
    success: function (response) {
      if(response == "1"){
        alert("Inicio exitoso")
        window.location.href = "index.html"
      }
      else{
        alert("Iniciaste mal")
      }
    },
    error: function (response) {
      alert("Algo salió mal");
    },
  });
}
