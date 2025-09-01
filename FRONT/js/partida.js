/* -----------------------------------------------------------------
- juego.php
----------------------------------------------------------------- */
// Configuracion del juego
// Datos de la partida
// Obtener la partida
var movimientos = {};
const id_partida = window.location.search.split('=')[1];
console.log("ID partida: " + id_partida);
fetch('../API_partidas/api.php/getpartida', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, id_partida }),
})
.then((response) => response.json())
.then((data) => {
    if (!data.error) {
        // Llama a la función para cargar las partidas listas
        console.log("Partida cargada:", data);
        const usr_name = document.getElementById("usr_name");
        const nombre_oponente = document.getElementById("nombre_oponente");
        usr_name.innerHTML = data.usr_name + "⭕";
        nombre_oponente.innerHTML = "❌" + data.nombre_oponente;
        movimientos = data.movimientos;
        // cargo el estado del tablero
        cargarEstadoTablero(data.movimientos);
    } else {
        console.log("Error: " + data.error);
        const usr_name = document.getElementById("usr_name");
        const nombre_oponente = document.getElementById("nombre_oponente");
        usr_name.innerHTML = data.error;
        nombre_oponente.innerHTML = data.error;
    }
})
.catch((error) => {
    console.error("Error al cargar partidas:", error);
});

function cargarEstadoTablero(movimientos) {
    // movimientos es un string tipo: "O,X,,O,,X,,"
    const boxes = document.querySelectorAll(".box");
    let estado = movimientos.split(",");
    boxes.forEach((box, i) => {
        box.innerText = estado[i] ? estado[i] : "";
        box.disabled = estado[i] !== ""; // deshabilita si ya hay ficha
    });
}

function getTurno(movimientos) {
    return movimientos % 2 === 0;
}