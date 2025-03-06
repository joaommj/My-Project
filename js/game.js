class Game {
    constructor(){
      this.spacePressedAt = null;
      this.errorMargin = 150;
      this.introScreen = document.querySelector("#game-intro");
      this.gameScreen = document.querySelector("#game-screen");
      this.gameOverScreen = document.querySelector("#game-over");
      this.scoreElement = document.querySelector("#score");
      this.livesProgElement = document.querySelector("#progress-bar");
      this.player = new Player(
      this.gameScreen, 
        40, 
        400, 
        80, 
        100, 
        "./images/Characters/mfarmergame.png"  // Default image for player
      );
      this.height = 100;
      this.width = 100;
      this.obstacles = [];
      this.bonuses = [];
      this.extraLives = []; 
      this.lastLifeGivenScore = 0;
      this.score = 0;
      this.progressBar = 3;
      this.gameIsOver = false;
      this.gameIntervalId = null;
      this.gameLoopFrequency = Math.round(1000 / 60);
      this.counter = 0;
      this.backgroundMusic = new Audio("audio/BUG-HUNTER.mp3");
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.1;
      this.playMusic();
      this.topScores = JSON.parse(localStorage.getItem("topScores")) || []; // Load top scores from localStorage, or empty array if none
    }
    playMusic() {
        this.backgroundMusic.play().catch(() => {
          // Add event listener to start music when user interacts with the page
          document.addEventListener("click", () => {
            this.backgroundMusic.play();
          }, { once: true }); // Ensures it only runs once
        });
      }

    start (){
        if (this.backgroundMusic.paused) {
            this.backgroundMusic.play();
        }
        //set the height and width of the game screen
        this.gameScreen.style.height = `${this.height}%`
        this.gameScreen.style.width = `${this.width}%`;
        //hide the start screen and show the game screen
        this.introScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';
        this.gameIntervalId = setInterval (()=> {
            this.gameLoop()
        }, this.gameLoopFrequency);
    }
    gameLoop() {
        //create a counter variable that increases on every frame
        this.counter++;
        if (this.counter % 100 === 0){
            this.obstacles.push(new Obstacle(this.gameScreen));
       }
      
        // Spawn extra life item when score reaches multiples of 10
        if (this.score > 0 && this.score % 10 === 0 && this.lastLifeGivenScore !== this.score) {
            this.extraLives.push(new ExtraLife(this.gameScreen));
            this.lastLifeGivenScore = this.score;  // Mark this score so we don’t spam extra lives
        }
        this.update();
        //inside the game loop we also check if the game is over
        if (this.gameIsOver){
            clearInterval(this.gameIntervalId);
        }
    }
    update() {
        // Move the player
        this.player.move();
    
        // Move and check collision for obstacles
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const currentObstacle = this.obstacles[i];
            currentObstacle.move();
    
            if (this.player.didCollide(currentObstacle)) {
                const now = Date.now(); // Get current time
                    
                if (this.spacePressedAt && now - this.spacePressedAt <= this.errorMargin) {
                    this.score += 1; // Bonus for well-timed jump

                } else {
                    this.progressBar -= 1; // Lose life if space wasn't pressed in time
                    // Play "ouch" sound effect
                    this.player.ouch.currentTime = 0;
                    this.player.ouch.play();
                }

                this.scoreElement.innerText = this.score;
                this.obstacles.splice(i, 1);
                currentObstacle.element.remove();
            }
            // Remove obstacle if it moves off-screen
            if (currentObstacle.left < -100) {
                this.progressBar -= 1;
                this.obstacles.splice(i, 1);
                currentObstacle.element.remove();
                // Play "ouch" sound effect
                this.player.ouch.currentTime = 0;
                this.player.ouch.play();
            } 
            if (this.progressBar < 0) this.progressBar = 0;
            // Update the visual progress bar
            this.livesProgElement.style.width = `${(this.progressBar / 3) * 100}%`;
             // Check if game is over
             if (this.progressBar === 0) {
                this.gameOver();
            }
            this.spacePressed = false;
        }
    
        // Move and check collision for extra life items
        for (let i = this.extraLives.length - 1; i >= 0; i--) {
            const currentLife = this.extraLives[i];
            currentLife.move();
        
            if (this.player.didCollide(currentLife)) {
                // Increase progress bar even if it's at max
                this.progressBar += 1;
        
                // Update progress bar width (but prevent it from overflowing visually)
                if (this.progressBar > 3) {
                this.livesProgElement.style.width = `${(this.progressBar -1 / 3) * 100}%`;
                }
                else{
                this.livesProgElement.style.width = `${(this.progressBar / 3) * 100}%`;
                }
                // Remove the extra life from the array and the screen
                this.extraLives.splice(i, 1);
                currentLife.element.remove();
                // Play extra life sound (optional)
                this.player.iuu.currentTime = 0;
                this.player.iuu.play();
            }
        }
    }
    gameOver(){
        // Stop background music
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0; // Reset it to the beginning
        
        // Play game over sound
        let gameOverSound = new Audio("audio/gameover.mp3");
        gameOverSound.volume = 0.1;
        gameOverSound.play();
        
        this.gameScreen.style.display = "none";
        //show the game over screen
        this.gameOverScreen.style.display = "block";
        clearInterval(this.gameIntervalId);
        
        // Add current score to top scores
        this.topScores.push(this.score);

        // Sort the scores in descending order
        this.topScores.sort((a, b) => b - a);

        // Keep only the top 5 scores
        if (this.topScores.length > 5) {
            this.topScores = this.topScores.slice(0, 5);
        }

        // Save top scores back to localStorage
        localStorage.setItem("topScores", JSON.stringify(this.topScores));

        // Display top scores on the game over screen
        this.displayTopScores();

        // Hide the game screen and show the game over screen
        this.gameScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'flex';
   }

    displayTopScores() {
       const topScoresList = document.querySelector("#topScore");

       // Clear any previous scores
       topScoresList.innerHTML = "";

       // Display the top 5 scores
       this.topScores.forEach((score, index) => {
           const scoreItem = document.createElement("li");
           scoreItem.textContent = `${index + 1} - ${score} points`;
           topScoresList.appendChild(scoreItem);
       });
   }
}