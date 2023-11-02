$(document).ready(function () {
    $("#buy").click(function () {
        $(".recuadro").toggleClass("active");
        $(".carousel-control-next-icon").hide();
    })
    $("#close").click(function () {
        $(".recuadro").toggleClass("active");
        $(".carousel-control-next-icon").show();
    })

    // Productos Imagenes
    var currentImageIndex = 0;
    var carouselImages = $('.carousel-item img');
    $('#inputGroupFile01').change(function () {
        if (currentImageIndex < carouselImages.length) {
            var currentImage = carouselImages.eq(currentImageIndex);
            var file = this.files[0];
            var reader = new FileReader();

            reader.onload = function (e) {
                currentImage.attr('src', e.target.result);
                currentImageIndex++;
            };
            reader.readAsDataURL(file);
        }
    });
    // Productos borrar imagenes
    $('#borrar').click(function () {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            var currentImage = carouselImages.eq(currentImageIndex);
            currentImage.attr('src', 'img-svg/plus-lg.svg');
            $('#inputGroupFile01').val('');
        }
    });
})
// Elegir Opcion Input 
function seleccionarOpcion(categoria, opcion) {
    dropdown = document.getElementById(`${categoria}Dropdown`);
    input = document.getElementById(`${categoria}_seleccionado`);

    dropdown.innerHTML = opcion;
    input.value = opcion;
}