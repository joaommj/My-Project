class ExtraLife {
    constructor(gameScreen) {
        this.left = 1450;
        this.top = Math.floor(Math.random() * (600 - 100) + 100);
        this.width = 80;
        this.height = 80;
        const bonusImages = [
            './images/Vegetables/brocoli.png',
            './images/Vegetables/carrot.png',
            './images/Vegetables/tomato.png',
        ];
        //Randomly pick an image
        const randomBonus = Math.floor(Math.random() * bonusImages.length);
        this.imageSrc = bonusImages[randomBonus];
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

    move() {
        this.left -= 5;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
    }
}