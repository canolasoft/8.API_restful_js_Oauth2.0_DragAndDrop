let boxes = [...document.querySelectorAll(".box")];
let resetBtn = document.querySelector("#reset");
let turnO = true; // Player O starts
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
      box.style.color = fichaArrastrada = "red";
      box.disabled = true;
      fichaArrastrada = null;
      turnO = !turnO;
      if (turnO) {
        turnoSpan.innerText = "O";
        fichaX.style.opacity = "0.5";
        fichaO.style.opacity = "1";
      } else {
        turnoSpan.innerText = "X";
        fichaO.style.opacity = "0.5";
        fichaX.style.opacity = "1";
      }
      checkWinner();
    }
  });
});

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
      showWinner(pos1Val);
      hasWin = true;
      return;
    }
  }

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
