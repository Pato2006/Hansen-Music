function registrarse(){
    usuario = {
        nombre : document.getElementById("typeEmailX").value,
        contraseña : document.getElementById("typePasswordX").value,
        action: "registrarse"
      }
      $.ajax({
        url: "PHP/login_reg.php",
        type: "POST",
        dataType: "text",
        data: usuario,
        async: false,
        success: function (response) {
          if(response == "1"){
            alert(response)
            window.location.href = "perfil-modificar.html";  
          }
          else{
            alert("algo ingresaste mal")
          }
        },
        error: function () {
          alert("MAL");
        },
      });
    
}