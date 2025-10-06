/* -----------------------------------------------------------------
- juego.php
----------------------------------------------------------------- */
let boxes = [...document.querySelectorAll(".box")];
let resetBtn = document.querySelector("#reset");
turnO = null; // true: O, false: X
//let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let fichaO = document.getElementById("fichaO");
let fichaX = document.getElementById("fichaX");

// Configuracion del juego
const partida = {
  id_partida: null,
  usr_name: "",
  nombre_oponente: "",
  movimientos: [],
  resultado: "", // 'O', 'X' o 'E' (empate)
};
// Datos de la partida
// Obtener la partida
var movimientos = {};
const id_partida = window.location.search.split("=")[1];
console.log("ID partida: " + id_partida);
fetch("../API_partidas/api.php/getpartida", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ token, id_partida }),
})
  .then((response) => response.json())
  .then((data) => {
    if (!data.error) {
      partida.id_partida = data.id_partida;
      partida.usr_name = data.usr_name;
      partida.nombre_oponente = data.nombre_oponente;
      partida.movimientos = data.movimientos;
      partida.resultado = data.resultado;
      partida.comienza = data.comienza;
      console.log("Partida cargada:", partida);
      const winPatterns = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
      ];
      iniciarJuego(winPatterns);
      if (partida.resultado !== "") {
        checkWinner(winPatterns);
      }
    } else {
      console.log("Error: " + data.error);
      alert("Error al cargar la partida: " + data.error);
      window.location.href = "panel_usuario.php";
    }
  })
  .catch((error) => {
    console.error("Error al cargar la partida:", error);
  });

function iniciarJuego(winPatterns) {
  console.log("Partida cargada:", partida);
  const usr_name = document.getElementById("usr_name");
  const nombre_oponente = document.getElementById("nombre_oponente");
  usr_name.innerHTML = partida.usr_name + "⭕";
  nombre_oponente.innerHTML = "❌" + partida.nombre_oponente;
  console.log("Partida comienza", partida.comienza);
  if (partida.comienza == "O") {
    console.log("Empieza O");
    usr_badge.classList.add("bg-warning");
    usr_badge.classList.remove("bg-secondary");
    opponent_badge.classList.remove("bg-warning");
    opponent_badge.classList.add("bg-secondary");
    turnO = true; // Player O starts
  } else {
    console.log("Empieza X");
    opponent_badge.classList.remove("bg-secondary");
    opponent_badge.classList.add("bg-warning");
    usr_badge.classList.remove("bg-warning");
    usr_badge.classList.add("bg-secondary");
    turnO = false; // Player X starts
  }
  console.log("Turno de O: " + turnO);
  // cargo el estado del tablero
  cargarEstadoTablero(partida.movimientos);
  // -------------------------------------------------
  // Lógica del juego
  if (turnO) {
    fichaX.style.opacity = "0.5";
    fichaO.style.opacity = "1";
    fichaO.classList.add("bg-warning");
    usr_badge.classList.add("bg-warning");
    usr_badge.classList.remove("bg-secondary");
    opponent_badge.classList.remove("bg-warning");
    opponent_badge.classList.add("bg-secondary");
  } else {
    fichaO.style.opacity = "0.5";
    fichaX.style.opacity = "1";
    fichaX.classList.add("bg-warning");
    opponent_badge.classList.add("bg-warning");
    opponent_badge.classList.remove("bg-secondary");
    usr_badge.classList.remove("bg-warning");
    usr_badge.classList.add("bg-secondary");
  }

  // Drag & Drop handlers
  let fichaArrastrada = null;

  fichaO.addEventListener("dragstart", function (e) {
    if (turnO) {
      fichaArrastrada = "O";
    } else {
      e.preventDefault();
    }
  });

  fichaX.addEventListener("dragstart", function (e) {
    if (!turnO) {
      fichaArrastrada = "X";
    } else {
      e.preventDefault();
    }
  });

  boxes.forEach((box) => {
    box.addEventListener("dragover", function (e) {
      e.preventDefault();
      if (!box.disabled && box.innerText === "") {
        box.classList.add("drag-over");
      }
    });
    box.addEventListener("dragleave", function (e) {
      box.classList.remove("drag-over");
    });
    box.addEventListener("drop", function (e) {
      e.preventDefault();
      box.classList.remove("drag-over");
      if (!box.disabled && box.innerText === "" && fichaArrastrada) {
        box.innerText = fichaArrastrada;
        //box.style.color = fichaArrastrada === 'O' ? 'green' : 'black';
        //box.style.color = fichaArrastrada = "red";
        box.disabled = true;
        fichaArrastrada = null;
        turnO = !turnO;
        if (turnO) {
          fichaX.style.opacity = "0.5";
          fichaO.style.opacity = "1";
          usr_badge.classList.add("bg-warning");
          usr_badge.classList.remove("bg-secondary");
          fichaO.classList.add("bg-warning");
          fichaO.classList.remove("bg-light");
          fichaX.classList.remove("bg-warning");
          fichaX.classList.add("bg-light");
          opponent_badge.classList.remove("bg-warning");
          opponent_badge.classList.add("bg-secondary");
        } else {
          fichaO.style.opacity = "0.5";
          fichaX.style.opacity = "1";
          usr_badge.classList.remove("bg-warning");
          usr_badge.classList.add("bg-secondary");
          fichaX.classList.add("bg-warning");
          fichaX.classList.remove("bg-light");
          fichaO.classList.remove("bg-warning");
          fichaO.classList.add("bg-light");
          opponent_badge.classList.add("bg-warning");
          opponent_badge.classList.remove("bg-secondary");
        }
        checkWinner(winPatterns);
      }
    });
  });
}

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
  // cuenta la cantidad de "O" dentro de los movimientos
  const cantidadO = movimientos
    .split(",")
    .filter((ficha) => ficha === "O").length;
  // cuenta la cantidad de "X" dentro de los movimientos
  const cantidadX = movimientos
    .split(",")
    .filter((ficha) => ficha === "X").length;
  if (cantidadO <= cantidadX) {
    return true; // Es el turno de O
  } else {
    return false; // Es el turno de X
  }
}

function getEstadoTablero() {
  return boxes.map((box) => box.innerText);
}

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "red";
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const showWinner = (winner, pattern) => {
  var jugador_gana = "";
  if (winner === "O") {
    jugador_gana = partida.usr_name + " (O)";
    usr_badge.classList.add("bg-success");
    opponent_badge.classList.add("bg-danger");
  } else {
    jugador_gana = partida.nombre_oponente + " (X)";
    opponent_badge.classList.add("bg-success");
    usr_badge.classList.add("bg-danger");
  }
  // cambio de color las celdas ganadoras
  boxes[pattern[0]].style.color = "green";
  boxes[pattern[1]].style.color = "green";
  boxes[pattern[2]].style.color = "green";
  fichaO.style.display = "none";
  fichaX.style.display = "none";
  disableBoxes();
};

const checkWinner = (winPatterns) => {
  let hasWin = false;
  var counter = 0;
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    if (
      pos1Val !== "" &&
      pos2Val !== "" &&
      pos3Val !== "" &&
      pos1Val === pos2Val &&
      pos2Val === pos3Val
    ) {
      console.log("pos1Val", pos1Val);
      console.log("pos2Val", pos2Val);
      console.log("pos3Val", pos3Val);
      console.log("counter", counter);
      if (pos1Val === "O") {
        showWinner("O", winPatterns[counter]);
        // cambiar el resultado de la partida
      } else {
        showWinner("X", winPatterns[counter]);
      }
      hasWin = true;
      finalizarPartida(pos1Val); // 'O', 'X' o 'E' (empate)
      //return; // retorna de la funcion sin enviar el movimiento a la api
    }
    counter++;
  }
  console.log(String(getEstadoTablero()));
  enviarMovimiento();
  console.log("------------------------------");

  if (!hasWin) {
    const allBoxes = [...boxes].every((box) => box.innerText !== "");
    if (allBoxes) {
      console.log("Empate");
      fichaO.style.display = "none";
      fichaX.style.display = "none";
      usr_badge.classList.remove("bg-warning");
      opponent_badge.classList.remove("bg-warning");
      usr_badge.classList.add("bg-secondary");
      opponent_badge.classList.add("bg-secondary");
      boxes.forEach((box) => (box.style.color = "grey"));
      disableBoxes();
      finalizarPartida("E"); // 'O', 'X' o 'E' (empate)
    }
  }
};

// envia el movimiento a la api
const enviarMovimiento = () => {
  data = {
    movimiento: String(getEstadoTablero()),
    token: token,
    id_partida: id_partida,
  };
  fetch("../API_partidas/api.php/movimiento", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.error) {
        // movimiento enviado
        console.log("Movimiento enviado:", data);
      } else {
        console.log("Error: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error al enviar movimiento:", error);
    });
};

// finaliza la partida
const finalizarPartida = (resultado) => {
  data = {
    token: token,
    id_partida: id_partida,
    resultado: resultado, // 'O', 'X' o 'empate'
  };
  fetch("../API_partidas/api.php/finalizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.error) {
        // partida finalizada
        console.log("Partida finalizada:", data);
      } else {
        console.log("Error: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error al finalizar la partida:", error);
    });
};
