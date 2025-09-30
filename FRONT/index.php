<?php
    include 'main_top.html';
?>
    <div id="inicio" class="px-4 pt-5 my-5 text-center">
        <h1>Draftosaurus en JavaScript</h1>
        <a href="test.html" class="btn btn-outline-success btn-lg">Iniciar prueba</a>
        <p>Este ejemplo muestra la lógica basica para una partida de Draftosaurus en JavaScript</p>
        <hr>
        <h1 class="display-4 fw-bold">Tic Tac Toe ❌|⭕</h1>
        <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">Arrastra y suelta las fichas para formar 3 en línea.</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
                <a onclick="loginForm()" href="#loginForm" class="btn btn-outline-warning btn-lg px-4 me-sm-3">
                    Iniciar juego
                </a>
            </div>
        </div>
        <div class="overflow-hidden" style="max-height: 30vh;">
            <img src="img/tictactoe1.webp" class="img-fluid border rounded-3 shadow-lg mb-4" alt="Example image" width="700" height="500" loading="lazy">
        </div>
    </div>

    <!-- Formulario para añadir un nuevo usuario -->
    <div class="container rounded-3 p-5 mt-3">
        <form id="registerForm" class="my-4 border border-light p-4 rounded col-lg-6 mx-auto" enctype="multipart/form-data">
            <h1 class="text-center">Registro de usuario</h1>
            <div class="mb-3">
                <label for="usr_name" class="form-label">Nombre <strong class="text-danger">*</strong></label>
                <input type="text" class="form-control" id="usr_name" name="usr_name" required>
            </div>
            <div class="mb-3">
                <label for="usr_email" class="form-label">Email <strong class="text-danger">*</strong></label>
                <input type="email" class="form-control" id="usr_email" name="usr_email" required>
            </div>
            <div class="mb-3">
                <label for="usr_pass" class="form-label">Contraseña <strong class="text-danger">*</strong></label>
                <input type="password" class="form-control" id="usr_pass" name="usr_pass" required>
            </div>
            <div class="row mb-3">
                <button type="submit" class="btn btn-warning col-lg-4 mx-auto mt-3">Registrar</button>
            </div>
            <hr>
            <p class="text-center">
                ¿Ya tienes cuenta? 
                <a onclick="loginForm()" href="#loginForm" class="btn btn-outline-warning btn-sm">
                    Inicia sesión
                </a>
            </p>
        </form>

        <!-- Formulario para iniciar sesión -->
        <form id="loginForm" class="my-4 border border-light p-4 rounded col-lg-6 mx-auto">
            <h1 class="text-center">Inicio de sesión</h1>
            <div class="mb-3">
                <label for="usr_email_login" class="form-label">Email <strong class="text-danger">*</strong></label>
                <input type="email" class="form-control" id="usr_email_login" name="usr_email_login" required>
                <label for="usr_pass_login" class="form-label">Contraseña <strong class="text-danger">*</strong></label>
                <input type="password" class="form-control" id="usr_pass_login" name="usr_pass_login" required>
                <div class="row">
                    <button type="submit" class="btn btn-warning col-lg-4 mx-auto mt-3">
                        Iniciar sesión
                    </button>
                </div>
            </div>
            <hr>
            <p class="text-center">
                ¿No tienes cuenta? 
                <a onclick="registerForm()" href="#registerForm" class="btn btn-outline-warning btn-sm">
                    Regístrate
                </a>
            </p>
        </form>
    </div>

<?php
    include 'main_bot.html';
?>

    <script src="js/index.js"></script>

</body>
</html>