<?php
include 'main.html';
?>
<div class="container bg-dark text-light rounded-3 p-5 mt-3 text-center">
    <h3>Usuario registrado</h3>
    <strong>Nombre: </strong><span id="usr_name"></span>
    <br>
    <strong>Email: </strong><span id="usr_email"></span>
    <hr>
    <!-- cerrar sesión -->
    <button onclick="cerrarSesion()" class="btn btn-outline-danger col-lg-4 mx-auto mt-3">Cerrar sesión</button>
</div>
<div class="container text-center">
    <h3>Configuración de la partida</h3>
    <form id="configForm" class="col-lg-6 my-4 bg-light text-dark p-4 rounded">
        <div class="mb-3">
            <label for="num_players" class="form-label">Número de jugadores (2-4) <strong class="text-danger">*</strong></label>
            <input type="number" class="form-control" id="num_players" name="num_players" min="2" max="4" value="2" required>
            <!-- Actualizar cantidad de inputs en el nombre y autocompletar con el nombre del usuario -->
        </div>
        <div class="mb-3">
            <label for="num_turns" class="form-label">Número de turnos (5-20) <strong class="text-danger">*</strong></label>
            <!-- Usar input de rango? -->
            <input type="number" class="form-control" id="num_turns" name="num_turns" min="5" max="20" value="10" required>
        </div>
        <div class="row">
            <button type="submit" class="btn btn-primary col-lg-4 mx-auto mt-3">Iniciar partida</button>
        </div>
    </form>
</div>

<!-- carga los datos del usuario -->
<script>
    // obtiene el token almacenado en la cookie del navegador
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    fetch('../API/api.php/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const [usr_name, usr_email, imagen] = data.success;
            document.getElementById('usr_name').innerHTML = usr_name;
            document.getElementById('usr_email').innerHTML = usr_email;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al cargar los datos del usuario. Por favor, inténtalo de nuevo.');
        window.location.href = '../FRONT/index.php';
    });
</script>

<!-- cierre de sesión -->
<script>
    function cerrarSesion() {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        fetch('../API/api.php/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usr_key: token })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Sesión cerrada correctamente');
                // Eliminar la cookie del token
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = '../FRONT/index.php';
            } else {
                alert('Error al cerrar sesión: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al cerrar sesión. Por favor, inténtalo de nuevo.');
        });
    }
</script>
</body>

</html>