function reporte(id) {
    const htmlForm = `
      <main class="fondo-black">
        <div class="container my-5 text-white">
          <h2 class="text-center mb-4">Reportar publicación #${id}</h2>
          <form id="form_quejas">
            <input type="hidden" name="publication_id" value="${id}">
            <div class="mb-3">
              <label for="motivo1" class="form-label">Motivo principal del reporte</label>
              <select class="form-select" id="motivo1" name="motivo1" required>
                <option value="" selected disabled>Selecciona una opción</option>
                <option>Contenido inapropiado</option>
                <option>Producto fraudulento</option>
                <option>Spam o engaño</option>
                <option>Otra razón grave</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="comentario" class="form-label">Comentarios adicionales</label>
              <textarea class="form-control" id="comentario" name="comentario" rows="4" placeholder="Agrega más detalles..."></textarea>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-danger px-4">Enviar Reporte</button>
            </div>
          </form>
        </div>
      </main>`;
  
    $("#contenedor").html(htmlForm);
  
    // Manejador del envío del formulario
    $(document).off("submit", "#form_quejas").on("submit", "#form_quejas", function (e) {
      e.preventDefault();
      const formData = $(this).serialize();
  
      $.ajax({
        url: "php/reportar_publicacion.php",
        type: "POST",
        data: formData,
        success: function () {
          alert("¡Reporte enviado correctamente!");
          window.location.href = "index.php";
        },
        error: function (xhr) {
          alert("Error al enviar el reporte");
          console.error(xhr.responseText);
        }
      });
    });
  }
  