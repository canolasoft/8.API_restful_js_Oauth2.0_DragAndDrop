<?php
include 'main.html';
?>
    <div class="container bg-dark text-light rounded-3 p-5 mt-3">
        <!-- Formulario para añadir un nuevo usuario -->
        <form id="uploadForm" class="my-4 bg-light text-dark p-4 rounded col-lg-6 mx-auto" enctype="multipart/form-data">
            <h1 class="text-center">Registro de usuarios</h1>
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
            <div class="mb-3">
                <label for="imagen" class="form-label">Imagen <strong class="text-danger">*</strong></label>
                <input type="file" class="form-control" id="imagen" name="imagen" accept="image/*" required>
            </div>
            <div class="row mb-3">
                <button type="submit" class="btn btn-primary col-lg-4 mx-auto mt-3">Registrar</button>
            </div>
            <hr>
            <p class="text-center">¿Ya tienes cuenta? <a href="#loginForm" onclick="loginForm()">Inicia sesión</a></p>
        </form>

        <!-- Formulario para iniciar sesión -->
        <form id="loginForm" class="my-4 bg-light text-dark p-4 rounded col-lg-6 mx-auto">
            <h1 class="text-center">Inicio de sesión</h1>
            <div class="mb-3">
                <label for="usr_email_login" class="form-label">Email <strong class="text-danger">*</strong></label>
                <input type="email" class="form-control" id="usr_email_login" name="usr_email_login" required>
                <label for="usr_pass_login" class="form-label">Contraseña <strong class="text-danger">*</strong></label>
                <input type="password" class="form-control" id="usr_pass_login" name="usr_pass_login" required>
                <div class="row">
                    <button type="submit" class="btn btn-primary col-lg-4 mx-auto mt-3">Iniciar sesión</button>
                </div>
            </div>
            <hr>
            <p class="text-center">¿No tienes cuenta? <a href="#uploadForm" onclick="uploadForm()">Regístrate</a></p>
        </form>
    </div>

    <script>
        // Función para mostrar el formulario de inicio de sesión
        function loginForm() {
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('uploadForm').style.display = 'none';
        }
        // Funcion para mostrar el formulario de registro
        function uploadForm() {
            document.getElementById('uploadForm').style.display = 'block';
            document.getElementById('loginForm').style.display = 'none';
        }
    </script>

    <!-- Solicitud POST para añadir un nuevo usuario a la API -->
    <script>
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const fileInput = form.imagen;
            const file = fileInput.files[0];

            const reader = new FileReader();
            reader.onload = function(event) {
                const data = {
                    usr_name: form.usr_name.value,
                    usr_email: form.usr_email.value,
                    usr_pass: form.usr_pass.value,
                    imagen: event.target.result // base64
                };

                console.log(JSON.stringify(data));

                fetch('../API/api.php/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    alert('Usuario registrado correctamente');
                    loginForm();
                })
                .catch(error => {
                    alert('Error al registrar usuario');
                    console.error(error);
                });
            };
            reader.readAsDataURL(file);
        });
    </script>

    <!-- Solicitud POST para iniciar sesión con la API -->
    <script>
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const data = {
                usr_email: form.usr_email_login.value,
                usr_pass: form.usr_pass_login.value
            };
            fetch('../API/api.php/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Inicio de sesión exitoso');
                    // guardo el token de inicio de sesión en una cookie
                    document.cookie = "token=" + data.success[2] + "; path=/";
                    // Redirigir a la página para configurar la partida
                    window.location.href = '../FRONT/config.php';
                } else {
                    alert('Error al iniciar sesión: ' + data.error);
                }
            })
            .catch(error => {
                alert('Error al iniciar sesión');
                console.error(error);
            });
        });
    </script>

    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
</body>
</html>