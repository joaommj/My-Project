class Obstacle{
    constructor(gameScreen){
        this.left = 1450 ;
        this.top = Math.floor(Math.random() * (window.innerHeight - 150)); // Adjust based on screen size
        this.width = 80;
        this.height = 80;
        //Array of possible obstacle images
        const obstacleImages = [
            './images/Bugs/bug1.png',
            './images/Bugs/bug2.png',
            './images/Bugs/bug3.png',
            './images/Bugs/bug4.png',
            './images/Bugs/bug5.png',
        ];
        //Randomly pick an image
        const randomIndex = Math.floor(Math.random() * obstacleImages.length);
        this.imageSrc = obstacleImages[randomIndex];

        //Create and configure the image element
        this.element = document.createElement("img");
        this.element.src = this.imageSrc;
        this.element.style.position = "absolute";
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        gameScreen.appendChild(this.element);
    }
    move(){
        this.left -= 6;
        this.updatePosition();

    }
    updatePosition(){
        this.element.style.left = `${this.left}px`;
    }
}