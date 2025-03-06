window.onload = function () {
    const startButtonElement = document.getElementById("start-button");
    const restartButtonElement = document.getElementById("restart-button");
    const usernameInput = document.getElementById("user-name");
    let ourNewGame = new Game();
    
    // Enable the start button only if the user enters a name
    usernameInput.addEventListener("input", () => {  
    if (usernameInput.value.trim() !== "") {
        startButtonElement.disabled = false;
    } else {
        startButtonElement.disabled = true;
      }
    });
    //all the event listeners here
    startButtonElement.addEventListener("click", function() {
      if (usernameInput.value.trim() === "") {
        
    } else {
        startGame();
    }
    });
    restartButtonElement.addEventListener("click", function() {
      window.location.reload();
    });
  //keyboard event listeners
  window.addEventListener("keydown", (event) =>{
      if (event.code === "ArrowUp") {
          ourNewGame.player.directionY = -5;
        } else if (event.code === "ArrowDown") {
          ourNewGame.player.directionY = 5;
        } else if (event.code === "ArrowLeft") {
          ourNewGame.player.directionX = -5;
        } else if (event.code === "ArrowRight") {
          ourNewGame.player.directionX = 5;
        }
      });
      window.addEventListener("keyup", (e) => {
        if (e.code === "ArrowUp") {
          ourNewGame.player.directionY = 0;
        } else if (e.code === "ArrowDown") {
          ourNewGame.player.directionY = 0;
        } else if (e.code === "ArrowLeft") {
          ourNewGame.player.directionX = 0;
        } else if (e.code === "ArrowRight") {
          ourNewGame.player.directionX = 0;
        }
      });

      function startGame(){
        ourNewGame.start();
      }
      
      let selectedImage = "./images/Characters/mfarmergame.png"; // Default selected character

      // Character selection logic
      const buttons = document.querySelectorAll("#farmer-container button");
      buttons.forEach(button => {
      button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("selected")); // Remove selected class
      button.classList.add("selected"); // Mark selected button
    
        // Set selected character image
        selectedImage = button.id === "maleFarmer"
          ? "./images/Characters/mfarmergame.png"
          : "./images/Characters/ffarmergame.png";
    
        // Update the player's image
        ourNewGame.player.element.src = selectedImage;
      });
    });
    
    // Spacebar event listener
    window.addEventListener("keyup", (s) => {
      
      if (s.key === " ") { // If spacebar is pressed
        ourNewGame.spacePressedAt = Date.now(); // Store the time when space is pressed
        let gifImage = selectedImage.includes("mfarmergame.png")
          ? "./images/Characters/gif/malegif.gif"
          : "./images/Characters/gif/femalegif.gif";
    
        ourNewGame.player.element.src = gifImage; // Change to GIF
        
        // After 0.5 second, revert to selected character image
        setTimeout(() => {
          ourNewGame.player.element.src = selectedImage;
        }, 500);
      }
    
    });
}