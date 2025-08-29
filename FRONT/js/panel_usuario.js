/* -----------------------------------------------------------------
- panel_usuario.php
----------------------------------------------------------------- */
// Carga los datos del usuario
// Obtiene el token almacenado en la cookie del navegador
fetch("../API/api.php/usuario", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
})
.then((response) => response.json())
.then((data) => {
    if (!data.error) {
        document.getElementById("usr_name").innerHTML = data.usr_name;
        document.getElementById("usr_email").innerHTML = data.usr_email;
    } else {
        alert("Error: " + data.error);
    }
})
.catch((error) => {
    console.error("Error:", error);
    alert("Error al cargar los datos del usuario. Por favor, inténtalo de nuevo.");
        //window.location.href = "../FRONT/index.php";
});
