/* -----------------------------------------------------------------
- main_bot.html
----------------------------------------------------------------- */
// obtengo el contenido del token de inicio de sesión
const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
if (token) {
    document.getElementById('icon_login').style.display = 'none';
    document.getElementById('icon_logout').style.display = 'block';
} else {
    document.getElementById('icon_login').style.display = 'block';
    document.getElementById('icon_logout').style.display = 'none';
}

// Mostrar el formulario de inicio de sesión
function loginForm() {
    if (token) {
        // Si hay token, redirige al panel del usuario
        window.location.href = '../FRONT/panel_usuario.php';
    } else {
        // Si no hay token, muestra el formulario de inicio de sesión
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    }
}

// Mostrar el formulario de registro
function registerForm() {
    document.getElementById('registerForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
}

// Cierre de sesión
function cerrarSesion() {
    fetch("../API/api.php/logout", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ usr_key: token }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert("Sesión cerrada correctamente");
            // Eliminar la cookie del token
            document.cookie ="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "../FRONT/index.php";
        } else {
            alert("Error al cerrar sesión: " + data.error);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
    });
}