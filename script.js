let level = 0;
let start = false;
let userSeq = [];
let gameSeq = [];
let colors = ["red", "blue", "yellow", "green"];
let p = document.querySelector("p");
let body = document.querySelector("body");
body.addEventListener("keypress", () => {
  if (start == false) {
    start = true;
    levelup();
    gameFlash();
  }
});

function levelup() {
  userSeq = [];
  level++;
  p.innerText = `Level-${level}`;
}

function gameFlash() {
  let rand = Math.floor(Math.random() * 4);
  let randCol = colors[rand];
  let selectColor = document.querySelector(`.${randCol}`);
  gameSeq.push(randCol);
  flashing(selectColor);
}

function flashing(selectColor) {
  selectColor.classList.add("flash");
  setTimeout(() => {
    selectColor.classList.remove("flash");
  }, 250);
}

function userFlashing(box) {
  box.classList.add("userFlash");
  setTimeout(() => {
    box.classList.remove("userFlash");
  }, 250);
}

function check(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      levelup();
      setTimeout(() => {
        gameFlash();
      }, 1000);
    }
  } else {
    p.innerHTML = `Game Over. <br> Your Score ${level}. <br>Press any key to restart.`;
    body.style.backgroundColor = "red";
    setTimeout(() => {
      body.style.backgroundColor = "#dcdcdc";
    }, 100);
    restart();
  }
}

function boxPress() {
  let box = this;
  userFlashing(box);
  let userCol = box.getAttribute("id");
  userSeq.push(userCol);

  check(userSeq.length - 1);
}
let allboxes = document.querySelectorAll(".box");
for (box of allboxes) {
  box.addEventListener("click", boxPress);
}

function restart() {
  level = 0;
  userSeq = [];
  gameSeq = [];
  start = false;
}
