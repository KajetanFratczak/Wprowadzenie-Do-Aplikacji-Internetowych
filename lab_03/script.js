  let hp = 3;
  let points = 100;
  let gameRunning = true;
  
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
  function startGame()
   {
    document.getElementById("start").style.display = "none";
    document.querySelector(".crosshair").style.display = "block";
    gameCanvas.start();
    hp = 3;
    points = 0;
    gameRunning = setInterval(() => spawnZombie(), 1000);
    updateScore();
    updateHp();
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
  function animate() 
  {
    if (!gameRunning) return;
  
    const context = gameCanvas.context;
    context.clearRect(0, 0, gameCanvas.canvas.width, gameCanvas.canvas.height);
  
    for (let i = zombies.length - 1; i >= 0; i--) 
    {
      const zombie = zombies[i];
      zombie.update();
  
      // Jeśli zombie wychodzi poza ekran
      if (zombie.isOutOfScreen()) 
      {
        zombies.splice(i, 1);
        loseHp();
        if (hp <= 0) {
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
    const rect = gameCanvas.canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
  
    for (let i = zombies.length - 1; i >= 0; i--) {
      if (zombies[i].isClicked(clickX, clickY)) {
        points += 10;
        zombies.splice(i, 1);
        updateScore();
        break;
      }
    }
  });
  
  // Utrata życia
  function loseHp() 
  {
    hp--;
    updateHp();
  }
  
  // Zakończenie gry
  function endGame()
  {
    clearInterval(gameRunning);
    document.getElementById("start").textContent = "Game Over! Restart?";
    document.getElementById("start").style.display = "block";
    document.querySelector(".crosshair").style.display = "none";
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