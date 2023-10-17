$(document).ready(function () {
  $("#login").click(function () {
    $.ajax({
      url: "PHP/login.php",
      type: "POST",
      dataType: "text",
      data: $("#form_login").serialize(),
      async: false,
      success: function (response) {
        if (response == "1") {
          alert("Inicio exitoso")
          window.location.href = "index.html"
        }
        else {
          alert("Iniciaste mal")
        }
      },
      error: function (response) {
        alert("Algo salió mal");
      },
    });
  })
})
