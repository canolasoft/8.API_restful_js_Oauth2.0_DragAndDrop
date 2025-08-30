<?php
    include 'main_top.html';
?>
    <div id="inicio" class="px-4 pt-5 my-5 text-center">
        <h3>Bienvenido <span id="usr_name"></span></h3>
        <strong><span id="usr_email"></span></strong>
        <br>
        <!-- Iniciar partida -->
        <form class="my-4 bg-light text-dark p-4 rounded col-lg-6 mx-auto" enctype="multipart/form-data">
            <h1 class="text-center">Nueva partida</h1>
            <div class="mb-3">
                <label for="usr_name" class="form-label">Nombre oponente<strong class="text-danger">*</strong></label>
                <input type="text" class="form-control" id="usr_name" name="usr_name" required>
            </div>
            <div class="row mb-3">
                <button type="submit" class="btn btn-warning col-lg-4 mx-auto mt-3">Iniciar</button>
            </div>
            <hr>
            <!-- Cerrar sesión -->
            <button onclick="cerrarSesion()" class="btn btn-outline-danger col-lg-4 mx-auto mt-3">Cerrar sesión</button>
        </form>
    </div>

    <hr>
    <div id="inicio" class="text-center">
        <h2>Partidas en curso</h2>
        <ul id="partidas-en-curso" class="list-group">
            <!-- Lista de partidas en curso -->
            <div id="partidas_encurso" class="row rounded mx-auto m-4 text-center"></div>
        </ul>
        <hr>
        <h2>Historial de partidas</h2>
        <ul id="partidas-finalizadas" class="list-group">
            <!-- Lista de partidas finalizadas -->
            <div id="partidas_finalizadas" class="row rounded mx-auto m-4 text-center"></div>
        </ul>
    </div>

<?php
    include 'main_bot.html';
?>

    <script src="js/panel_usuario.js"></script>

</body>
</html>