const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const start = document.querySelector(".start");
const gameOverScreen = document.querySelector(".game-over");

gameThemeAudio = new Audio("./soung/audio_theme.mp3");
gameThemeAudio.loop = true;
gameOverAudio = new Audio("./soung/audio_gameover.mp3");

const startGame = () => {
  pipe.classList.add("pipe-animation");
  start.style.display = "none";

  // audio
  gameThemeAudio.play();
};

const jump = () => {
  mario.classList.add("jump");

  setTimeout(() => {
    mario.classList.remove("jump");
  }, 800);
};

const restartGame = () => {
  start.style.display = "none";
  gameOverScreen.style.display = "none";
  pipe.style.left = "";
  pipe.style.right = "0";
  mario.src = "./img/mario.gif";
  mario.style.width = "150px";
  mario.style.bottom = "0";

  gameThemeAudio.currentTime = 0;
  gameThemeAudio.play();
};

const loop = () => {
  setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = window
      .getComputedStyle(mario)
      .bottom.replace("px", " ");

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      pipe.classList.remove(".pipe-animation");
      pipe.style.left = `${pipePosition}px`;

      mario.classList.remove(".jump");
      mario.style.bottom = `${marioPosition}px`;

      mario.src = "./img/game-over.png";
      mario.style.width = "80px";
      mario.style.marginLeft = "50px";

      gameThemeAudio.pause()

      gameOverScreen.style.display = "flex";

      clearInterval(loop);
    }
  }, 10);
};

loop();

// Verifica se o teclado é pressionado, se a tecla Space for pressionada o Mário irá pular
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    jump();
  }
});

// Verifica se o tela do dispositivo móvel é pressionada, caso seja o Mário irá pular
document.addEventListener("touchstart", (e) => {
  if (e.touches.length) {
    jump();
    console.log("Tela pressionada!");
  }
});
