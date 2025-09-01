/* -----------------------------------------------------------------
- juego.php
----------------------------------------------------------------- */
let boxes = [...document.querySelectorAll(".box")];
let resetBtn = document.querySelector("#reset");
let turnO = true; // Player O starts
//let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let fichaO = document.getElementById("fichaO");
let fichaX = document.getElementById("fichaX");
let turnoSpan = document.getElementById("turno");

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
      turnO = getTurno(movimientos); // Player O starts
      console.log("Turno de O: " + turnO);
      // cargo el estado del tablero
      cargarEstadoTablero(data.movimientos);
      // -------------------------------------------------
      // Lógica del juego
      if (turnO) {
        turnoSpan.innerText = "O";
        fichaX.style.opacity = "0.5";
        fichaO.style.opacity = "1";
        fichaO.classList.add("bg-warning");
        usr_badge.classList.add("bg-warning");
        usr_badge.classList.remove("bg-light");
        opponent_badge.classList.add("bg-warning");
        opponent_badge.classList.remove("bg-light");
      } else {
        turnoSpan.innerText = "X";
        fichaO.style.opacity = "0.5";
        fichaX.style.opacity = "1";
        fichaX.classList.add("bg-warning");
        opponent_badge.classList.add("bg-warning");
        opponent_badge.classList.remove("bg-light");
        usr_badge.classList.remove("bg-warning");
        usr_badge.classList.add("bg-light");
      }

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
              turnoSpan.innerText = "O";
              fichaX.style.opacity = "0.5";
              fichaO.style.opacity = "1";
              usr_badge.classList.add("bg-warning");
              usr_badge.classList.remove("bg-light");
              fichaO.classList.add("bg-warning");
              fichaO.classList.remove("bg-light");
              fichaX.classList.remove("bg-warning");
              fichaX.classList.add("bg-light");
              opponent_badge.classList.remove("bg-warning");
              opponent_badge.classList.add("bg-light");
            } else {
              turnoSpan.innerText = "X";
              fichaO.style.opacity = "0.5";
              fichaX.style.opacity = "1";
              usr_badge.classList.remove("bg-warning");
              usr_badge.classList.add("bg-light");
              fichaX.classList.add("bg-warning");
              fichaX.classList.remove("bg-light");
              fichaO.classList.remove("bg-warning");
              fichaO.classList.add("bg-light");
              opponent_badge.classList.add("bg-warning");
              opponent_badge.classList.remove("bg-light");
            }
            checkWinner(winPatterns);
          }
        });
      });
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
  // cuenta la cantidad de "O" dentro de los movimientos
  const cantidadO = movimientos.split(",").filter(ficha => ficha === "O").length;
  // cuenta la cantidad de "X" dentro de los movimientos
  const cantidadX = movimientos.split(",").filter(ficha => ficha === "X").length;
  if (cantidadO <= cantidadX) {
    return true; // Es el turno de O
  } else {
    return false; // Es el turno de X
  }
}

function getEstadoTablero() {
  return boxes.map(box => box.innerText);
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

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = (winPatterns) => {
  let hasWin = false;
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
      if (pos1Val === "O") {
        showWinner("O");
        // cambiar el resultado de la partida
      } else {
        showWinner("X");
      }
      hasWin = true;
      return;
    }
  }
  console.log(String(getEstadoTablero()));
  enviarMovimiento();
  console.log("------------------------------");

  if (!hasWin) {
    const allBoxes = [...boxes].every((box) => box.innerText !== "");
    if (allBoxes) {
      msgContainer.classList.remove("hide");
      msg.innerText = "Match Drawn";
    }
  }
};

const resetGame = () => {
  turnO = true;
  turnoSpan.innerText = "O";
  enableBoxes();
  msgContainer.classList.add("hide");
  fichaArrastrada = null;
};

resetBtn.addEventListener("click", resetGame);

// envia el movimiento a la api
const enviarMovimiento = () => {
  data = {
    movimiento: String(getEstadoTablero()),
    token: token,
    id_partida: id_partida
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

