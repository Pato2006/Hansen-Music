<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=1, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap-grid">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/keyframe.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="shortcut icon" href="img-svg/guitarra.svg" type="image/x-icon">
    <link rel="stylesheet" href="css/cesese.css">
    <link rel="stylesheet" href="css/carrusel.css">
    <script src="js/script.js"></script>
    <script src="js/busqueda.js"></script>
    <script src="js/registro.js"></script>
    <script src="js/login.js"></script>
    <script src="js/perfil.js"></script>
    <script src="js/subirproduc.js"></script>
    <script src="js/perfil_subir.js"></script>
    <script src="js/Paginador.js"></script>
    <title>Hansen Music</title>
</head>

<body>
    <header id="cabecera">
        <div id="contactos">
            <ul>
                <li class="item"><a href="#contacto">Contacto</a></li>
                <li class="item"><a href="#nosotros">Acerca de Nosotros</a></li>
                <li class="item"><a href="#preg_frec">Preguntas Frecuentes</a></li>
            </ul>
        </div>
    </header>
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand pe-4" href="index.php">
                <svg class="" width="400" height="64" src="">
                    <image xlink:href="img-svg/HansenLogoHorizontal.svg" width="100%" height="100%" />
                </svg>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                <svg xmlns="http://www.w3.org/2000/svg" width="70" height="50" fill="currentColor" class="bi bi-arrow-down-square" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                </svg>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <form id="busca" class="d-flex pe-2 text-center ms-4" role="search" method="post" action="producto.html">
                    <div class="row">
                        <div class="col-4 d-flex align-items-center flex-grow-1">
                            <input name="texto_buscar" id="buscador" class="form-control form-control-lg me-2" type="search" placeholder="Que estas buscando?" aria-label="Search">
                            <button class="btn-bsq btn-outline btn-lg" type="button" id="busqueda">
                                <img src="img-svg/search.svg" alt="">
                            </button>
                        </div>
                    </div>
                </form>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-pills d-flex flex-wrap text-center">
                    <li class="nav-item"><a href="#" class="nav-link active" aria-current="page" id="vende-btn">Vende
                            tu producto</a></li>
                    <li class=""><a href="#" class="nav-link ms-3"></a></li>
                    <div class="boton_solution">
                        <div class="nav-item dropdown">
                            <button id="menuDropdown" class="btn   dropdown-toggle nav-item" type="button" data-bs-toggle="dropdown">
                                <img src="img-svg/person.svg" alt="">
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" id="registrarse-btn">Registrarse</a></li>
                                <li><a class="dropdown-item" href="#" id="login-btn">Login</a></li>
                                <li><a class="dropdown-item" href="#" id="perfil-btn">Perfil</a></li>
                            </ul>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </nav>
    <div id="contenedor">
        <main id="carouselExample" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="img/carrusel1.png" class="d-block w-100" alt="Imagen 1">
                </div>
                <div class="carousel-item">
                    <img src="img/carrusel2.png" class="d-block w-100" alt="Imagen 2">
                </div>
                <div class="carousel-item">
                    <img src="img/carrusel3.png" class="d-block w-100" style="height: 25%;" alt="Imagen 3">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </a>
            <a class="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Siguiente</span>
            </a>
        </main>
    </div>
    <div class="logos">
        <div class="logos-slide">
            <img src="./img-svg/marca1.svg">
            <img src="./img-svg/marca2.svg">
            <img src="./img-svg/marca3.svg">
            <img src="./img-svg/marca4.svg">
            <img src="./img-svg/marca5.svg">
        </div>

        <div class="logos-slide">
            <img src="./img-svg/marca1.svg">
            <img src="./img-svg/marca2.svg">
            <img src="./img-svg/marca3.svg">
            <img src="./img-svg/marca4.svg">
            <img src="./img-svg/marca5.svg">
        </div>
    </div>
</body>

</html>