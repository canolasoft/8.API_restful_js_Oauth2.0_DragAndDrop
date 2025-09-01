/* -----------------------------------------------------------------
- juego.php
----------------------------------------------------------------- */
// Lógica del juego
let boxes = [...document.querySelectorAll(".box")];
let resetBtn = document.querySelector("#reset");
let turnO = getTurno(movimientos); // Player O starts
//let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let fichaO = document.getElementById("fichaO");
let fichaX = document.getElementById("fichaX");
let turnoSpan = document.getElementById("turno");

if (turnO) {
  turnoSpan.innerText = "O";
  fichaX.style.opacity = "0.5";
  fichaO.style.opacity = "1";
  fichaO.classList.add("bg-warning");
} else {
  turnoSpan.innerText = "X";
  fichaO.style.opacity = "0.5";
  fichaX.style.opacity = "1";
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
      checkWinner();
    }
  });
});

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
  usr_badge.classList.add("bg-success");
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
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
      if(pos1Val === "O") {
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