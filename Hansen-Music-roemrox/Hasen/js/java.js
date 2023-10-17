function romero(element) {
    
    var botones = document.querySelectorAll('.boton');

    
    botones.forEach(function(boton) {
        
        boton.classList.remove('rojo');
    });

    
    element.classList.add('rojo');
}