$(document).ready(function () {
  $("#registrarse").click(function () {
    $.ajax({
      url: "PHP/register.php",
      type: "POST",
      dataType: "text",
      data: $("#form_register").serialize(),
      async: false,
      success: function (response) {
          if(response == "1"){
            alert("Registro Exitoso")
            window.location.href = "login.html";  
          }
          else{
            alert("algo ingresaste mal")
          }
        
      },
      error: function () {
        alert("MAL");
      },
    });
  })
})
