$(document).ready(function () {
    $.ajax({
        url: "PHP/perfil.php",
        type: "POST",
        dataType: "json",
        async: false,
        success: function(data){
            console.log(data)
        },
        error: function(error){
            console.log(error)
        }
    })
})