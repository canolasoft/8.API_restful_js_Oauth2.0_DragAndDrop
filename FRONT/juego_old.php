<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Drag and Drop Game</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container text-center">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="mt-5">Juego de Arrastrar y Soltar</h1>
                <p class="lead">Arrastra las fichas a las zonas correspondientes.</p>
            </div>
        </div>
        <hr>
        <p><strong>Jugador: </strong><span id="current-player">Jugador 1</span></p>
        <p><strong>Puntos: </strong><span id="current-points">0</span></p>
        <h3>Tablero</h3>
        <div class="row justify-content-center">
            <div class="col-lg-10 d-flex">
                <div class="dropzone mx-auto" id="zone1">Zona 1</div>
                <div class="dropzone mx-auto" id="zone2">Zona 2</div>
            </div>
        </div>
        <div class="row justify-content-center border border-4 rounded rounded-4 mt-5 p-3">
            <h3>Mano</h3>
            <div class="col-lg-10 d-flex">
                <div class="draggable mx-auto bg-primary text-light" draggable="true" id="item1">Ficha 1</div>
                <div class="draggable mx-auto bg-primary text-light" draggable="true" id="item2">Ficha 2</div>
                <div class="draggable mx-auto bg-primary text-light" draggable="true" id="item3">Ficha 3</div>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>

    <script src="js/script.js"></script>
</body>
</html>