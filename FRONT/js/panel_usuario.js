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

getPartidas();

// Obtener las partidas
function getPartidas() {
        fetch('../API_partidas/api.php/getpartidas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        body: JSON.stringify({ token }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (!data.error) {
            // Llama a la función para cargar las partidas listas
            loadPartidas(data);
        } else {
            console.log("Error: " + data.error);
            const partidas_encurso = document.getElementById("partidas_encurso");
            const partidas_finalizadas = document.getElementById("partidas_finalizadas");
            partidas_encurso.innerHTML = data.error;
            partidas_finalizadas.innerHTML = data.error;
        }
    })
    .catch((error) => {
        console.error("Error al cargar partidas:", error);
    });
}

// Carga las partidas en listas
function loadPartidas(partidas) {
    const partidas_encurso = document.getElementById("partidas_encurso");
    const partidas_finalizadas = document.getElementById("partidas_finalizadas");
    partidas_encurso.innerHTML = ""; // Limpiar la lista existente
    partidas_finalizadas.innerHTML = ""; // Limpiar la lista existente
    partidas.forEach(partida => {
        console.log("Partida:", partida);
        const li = document.createElement("li");
        if (partida.resultado == "0") { /* 0: en curso, 1: ganado, 2: perdido, 3: empate */
            const partidaDiv = document.createElement("div");
            partidaDiv.innerHTML = partida.fecha.substring(0, 10)
            + "⚡ Partida en curso contra <strong>"
            + partida.nombre_oponente + ". </strong>"
            + "<a class='text-warning' href='juego.php?id=" + partida.id + "'>▶ continuar</a>";
            partidas_encurso.appendChild(partidaDiv);
        } else {
            switch (partida.resultado) {
                case "1":
                    resultado = "Ganaste";
                    break;
                case "2":
                    resultado = "Perdiste";
                    break;
                case "3":
                    resultado = "Empate";
                    break;
            }
            const partidaDiv = document.createElement("div");
            partidaDiv.innerHTML = partida.fecha.substring(0, 10)
            + "✔ Partida finalizada contra <strong>"
            + partida.nombre_oponente + ". </strong>"
            + "Resultado: " + resultado;
            partidas_finalizadas.appendChild(partidaDiv);
        }
    });
}

// Crea una nueva partida
document.getElementById('crearPartidaForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita el envío del formulario
    const form = e.target;
    const data = {
        token: token,
        nombre_oponente: form.usr_name.value,
    };

    fetch('../API_partidas/api.php/addpartida', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if (!data.error) {
            // Recargar las partidas después de crear una nueva
            console.log("data: ", data);
            // redirijo a la partida creada
            window.location.href = "juego.php?id=" + data.id_partida;
        } else {
            console.log("Error: " + data.error);
        }
    })
    .catch((error) => {
        console.error("Error al crear partida:", error);
    });
});
