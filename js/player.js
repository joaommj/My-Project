class Player{
    constructor( gameScreen,
        positionLeft,
        positionTop,
        playerWidth,
        playerHeight,
        playerImageSrc
    )
    {
        this.positionLeft = positionLeft;
        this.positionTop = positionTop;
        this.width = playerWidth;
        this.height = playerHeight;
        this.directionX = 0;
        this.directionY = 0;
        this.iuu = new Audio('./audio/iuuu.mp3');
        this.iuu.volume = 0.7;
        this.ouch = new Audio('./audio/ouch.mp3');
        this.ouch.volume = 0.7;
        this.element = document.createElement("img");
        this.element.src = playerImageSrc;
        this.element.style.position = "absolute";
        this.element.style.top = `${positionTop}px`;
        this.element.style.left = `${positionLeft}px`;
        this.element.style.width =  `${playerWidth}px`;
        this.element.style.height = `${playerHeight}px`;

        //after creating the img element and setting the properties
        //make sure to append or 'add' the img to the page
        gameScreen.appendChild (this.element);
    }
    move(){
        this.positionLeft += this.directionX;
        this.positionTop += this.directionY;
        //put limits at the left and rigth side
        if (this.positionLeft <40){
            this.positionLeft = 40;
        }
        if (this.positionLeft + this.width > 1400){
            this.positionLeft = 1400- this.width;;
        }

        //put limits at the top and the bottom
        if (this.positionTop <0){
            this.positionTop= 0;
        }
        if (this.positionTop + this.width > 620){
            this.positionTop= 620- this.width;;
        }
        this.updatePosition();
    }
    updatePosition(){
        this.element.style.top = `${this.positionTop}px`;
        this.element.style.left = `${this.positionLeft}px`;
    }
    
    didCollide (obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
        if(playerRect.left<obstacleRect.right &&
            playerRect.right>obstacleRect.left &&
            playerRect.top<obstacleRect.bottom &&
            playerRect.bottom>obstacleRect.top){
            return true;
        }
        else {
    
            return false;
        }
    }
}