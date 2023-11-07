$(document).ready(function () {
  $("#login-btn").click(function () {
    str = `
    <main class="login">
      <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-cente  r">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h4 class="text-white-50 mb-5">Bienvenido a</h4>
                    <img src="imagenes/svg/HasenLogin.svg" alt="" class="mb-5">
                    <p class="text-white-50 mb-5">Inicia Sesion</p>
                    <form action="" method="POST" id="form_login">
                    <div class="form-outline form-white mb-4">
                        <p id="cambio" class="form-label" for="typeEmailX">Usuario/Correo Electronico</p>
                        <input type="email" id="typeEmailX" class="form-control form-control-lg"
                            style="width: 400px;" name="user" />  
                    </div>
                    <div class="form-outline form-white mb-4">
                        <p id="cambio1" class="form-label" for="typePasswordX">Contraseña</p>
                        <input type="password" id="typePasswordX"
                            class="form-control form-control-lg" style="width: 380px;"
                            name="password" />
                    </div>
                    <button class="btn btn-outline btn-lg px-5 ms-2" type="button" id="login">Inicia sesion</button>
                    </form>
                  </div>
                  <div>
                    <p class="mb-0">¿No tienes una cuenta?
                      <a href="#" class="text-white-50 fw-bold" id=register>Regístrate</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>`;
    $("#contenedor").html(str);

    $("#login").click(function () {
      $.ajax({
        url: "php/login.php",
        type: "POST",
        dataType: "text",
        data: $("#form_login").serialize(),
        async: false,
        success: function (response) {
          if (response == "1") {
            alert("Inicio exitoso");
            window.location.href = "index.php"
          } else {
            var cambio = document.getElementById("cambio");
            var cambio2 = document.getElementById("cambio1");
            cambio.textContent = "Usuario/Correo Electronico ❌";
            cambio2.textContent = "Contraseña ❌";
            alert("Inicio de sesión fallido");
          }
        },
        error: function () {
          alert("Algo salió mal");
        },
      });
    });
  });
});