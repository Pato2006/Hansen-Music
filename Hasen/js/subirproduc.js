$(document).ready(function(){
    $("#subir_prod").click(function(){
        $.ajax({
            url:"PHP/subir_produc.php",
            type: "POST",
            dataType: "text",
            data: $("#form_subir").serialize(),
            async: false,
            success: function (asd) {
                alert(asd)
            }
        })
    })
})
