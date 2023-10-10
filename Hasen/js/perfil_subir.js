$(document).ready(function () {
  $("#actualizar").click(function () {
    if (document.getElementById("nombre").value === "" || document.getElementById("mail").value === "" || document.getElementById("entregaDropdown").textContent === "") {
      alert("Ingresa datos")
      return
    }
    $.ajax({
      url: "PHP/perfil_subir.php",
      type: "POST",
      dataType: "blob",
      data: $("#form_actualizar").serialize(),
      async: false,
      success: function (data) {
        window.location.href = "index.html"
      },
      error: function (data) {
        alert(data)
      },
    });
  })
})
function FotoPerfil() {
  form = document.getElementById("form_actualizar");
  imagenInput = document.getElementById("formFileLg");
  
  if (imagenInput && imagenInput.files.length > 0) {
    archivo = imagenInput.files[0];

    formData = new FormData(form);

    formData.append("nomb", archivo.name);
    formData.append("tipo", archivo.type);
    formData.append("tamaño", archivo.size);

    $.ajax({
      url: "PHP/perfil_subir_img.php",
      type: "POST",
      dataType: "text",
      data: formData,
      processData: false,  // Evita que jQuery procese los datos
      contentType: false,  // Evita que jQuery establezca el encabezado Content-Type
      async: false,
      success: function (data) {
        alert(data);
      },
      error: function (data) {
        alert(data);
      },
    });
  } else {
    alert("Selecciona una imagen antes de enviar.");
  }
}