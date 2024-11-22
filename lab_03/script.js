  let hp = 3;
  let points = 100;
  let gameRunning = true;
  let gameOverMusic = null;
  
  const zombies = []; // Przechowuje wszystkie zombie
  const gameCanvas = {
    canvas: document.querySelector("canvas"),
    context: null,
    start: function () {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.context = this.canvas.getContext("2d");
    },
  };
  
  // Funkcja losująca liczbę całkowitą
  function getRandomInt(min, max) 
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Rozpoczęcie gry
  function startGame() {
    // Zatrzymanie muzyki z gry over
    if (gameOverMusic) {
      gameOverMusic.pause();
      gameOverMusic.currentTime = 0; // Resetowanie dźwięku
      gameOverMusic = null;
    }
  
    // Resetowanie interfejsu i zmiennych gry
    document.getElementById("start").style.display = "none";
    document.querySelector(".crosshair").style.display = "block";
    gameCanvas.start();
    hp = 3;
    points = 100;
    zombies.length = 0; // Resetowanie tablicy zombie
    updateScore();
    updateHp();
  
    // Restart animacji i logiki
    if (gameRunning) clearInterval(gameRunning);
    gameRunning = setInterval(() => spawnZombie(), 1000);
    requestAnimationFrame(animate);
  
    // Przywrócenie możliwości klikania w canvas
    gameCanvas.canvas.style.pointerEvents = "auto";
  }
  
  // Zombie jako klasa
  class Zombie 
  {
    constructor() {
      this.speed = getRandomInt(2, 10);
      this.scale = getRandomInt(1, 2);
      this.bottom = getRandomInt(1, 10);
      this.width = 200 * this.scale;
      this.height = 312 * this.scale;
      this.x = window.innerWidth;
  
      // Ustawienie `y` z uwzględnieniem wysokości zombie
      this.y =
        window.innerHeight - this.height - this.bottom * (window.innerHeight / 100);
  
      // Dodanie zombie do canvasu
      this.image = new Image();
      this.image.src = "walkingdead.png";
  
      // Animacja klatek
      this.currentFrame = 0;
      this.frameBuffer = 10;
      this.elapsedFrames = 0;
      this.totalFrames = 10;
    }
  
    draw() 
    {
      const cropbox = 
      {
        x: this.currentFrame * (this.image.width / this.totalFrames),
        y: 0,
        width: this.image.width / this.totalFrames,
        height: this.image.height,
      };
  
      gameCanvas.context.drawImage
      (
        this.image,
        cropbox.x,
        cropbox.y,
        cropbox.width,
        cropbox.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  
    update() 
    {
      this.x -= this.speed;
      this.elapsedFrames++;
  
      if (this.elapsedFrames % this.frameBuffer === 0)
      {
        this.currentFrame = (this.currentFrame + 1) % this.totalFrames;
      }
  
      this.draw();
    }
  
    isOutOfScreen() 
    {
      return this.x + this.width < 0;
    }
  
    isClicked(clickX, clickY) 
    {
      return (
        clickX >= this.x &&
        clickX <= this.x + this.width &&
        clickY >= this.y &&
        clickY <= this.y + this.height
      );
    }
  }
  
  // Spawn nowego zombie
  function spawnZombie() 
  {
    zombies.push(new Zombie());
  }
  
  // Animacja gry
  function animate() {
    if (!gameRunning) return; // Sprawdzanie, czy gra trwa
  
    const context = gameCanvas.context;
    context.clearRect(0, 0, gameCanvas.canvas.width, gameCanvas.canvas.height);
  
    for (let i = zombies.length - 1; i >= 0; i--) {
      const zombie = zombies[i];
      zombie.update();
  
      // Jeśli zombie wychodzi poza ekran
      if (zombie.isOutOfScreen()) {
        zombies.splice(i, 1);
        loseHp();
        if (hp <= 0) {
          endGame();
          return;
        }
      }
    }
  
    requestAnimationFrame(animate);
  }
  
  // Aktualizacja punktów
  function updateScore() 
  {
    const scoreElement = document.querySelector(".score");
    scoreElement.textContent = `Score: ${points}`;
  }
  
  // Aktualizacja HP
  function updateHp() {
    const heartsContainer = document.querySelector(".hp");
    heartsContainer.innerHTML = "";
    for (let i = 0; i < hp; i++) 
    {
      const heart = document.createElement("img");
      heart.src = "full_heart.png";
      heart.alt = "Heart";
      heartsContainer.appendChild(heart);
    }
    if (hp <= 0) {
      endGame();
    }
  }
  
  // Obsługa kliknięcia w zombie
  gameCanvas.canvas.addEventListener("click", (e) =>
  {
    if (points <= 0) return; // Uniemożliwia strzał przy zerowych punktach

    const rect = gameCanvas.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    let hit = false;
  
    for (let i = zombies.length - 1; i >= 0; i--) {
      if (zombies[i].isClicked(clickX, clickY)) {
        points += 20;
        zombies.splice(i, 1);
        hit = true; // Zombie zostało trafione
        break;
      }
    }

    if (!hit) {
      points -= 5; // Odejmowanie punktów za niecelny strzał
      if (points < 0) points = 0; // Ustaw punktację minimalną na 0
    }

    updateScore();

  });
  
  // Utrata życia
  function loseHp() 
  {
    hp--;
    updateHp();
  }
  
  // Zakończenie gry
  function endGame() {
    clearInterval(gameRunning);
    gameRunning = null; // Zatrzymanie interwału
    document.getElementById("start").textContent = "Game Over! Restart?";
    document.getElementById("start").style.display = "block";
    document.querySelector(".crosshair").style.display = "none";
    gameCanvas.canvas.style.pointerEvents = "none"; // Wyłącza możliwość klikania
  
    // Odtwarzanie muzyki po przegranej
    if (!gameOverMusic) {
      gameOverMusic = new Audio("sad-music.mp3");
      gameOverMusic.loop = true; // Włącz powtarzanie muzyki
      gameOverMusic.play();
    }
  }
  
  // Inicjalizacja
  document.getElementById("start").addEventListener("click", () => {
    startGame();
    requestAnimationFrame(animate);
  });

  document.addEventListener("mousemove", (event) => {
    const customCursor = document.querySelector(".crosshair");
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;
  });