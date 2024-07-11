class SalsaBottles extends MovableObject {

    height = 60;
    width = 50;
    


    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 370;
    }
}