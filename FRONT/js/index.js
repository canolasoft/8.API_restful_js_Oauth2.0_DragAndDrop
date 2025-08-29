/* -----------------------------------------------------------------
- index.php
----------------------------------------------------------------- */
// API: Añadir un nuevo usuario
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        usr_name: form.usr_name.value,
        usr_email: form.usr_email.value,
        usr_pass: form.usr_pass.value
    };

    console.log(JSON.stringify(data));

    fetch('../API/api.php/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(async response => {
        const resJson = await response.json();
        if (!response.ok) {
            throw new Error(resJson.error || 'Error desconocido');
        }
        return resJson;
    })
    .then(success => {
        alert('Usuario registrado correctamente');
        //location.reload();
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
});

// API: Iniciar sesión
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {
        usr_email: form.usr_email_login.value,
        usr_pass: form.usr_pass_login.value,
    };
    fetch("../API/api.php/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert("Inicio de sesión exitoso");
            // Guarda el token de inicio de sesión en una cookie
            document.cookie = "token=" + data.success[2] + "; path=/";
            // Redirige al panel del usuario
            window.location.href = "../FRONT/panel_usuario.php";
        } else {
            alert("Error al iniciar sesión: " + data.error);
        }
    })
    .catch((error) => {
        alert("Error al iniciar sesión");
        console.error(error);
    });
});