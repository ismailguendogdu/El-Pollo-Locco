class Chicken extends MovableObject {

    height = 50;
    y = 370;
    width = 60;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    



    constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 800;
    this.speed = 0.15 + Math.random() * 0.5;

    this.isDeadChicken = false;
    this.isRemovable = false;
    
    this.animate();
    }


    animate() {
        setInterval(() => {
            if (!this.isDeadChicken) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDeadChicken) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    dieChicken() {
        this.loadImage(this.IMAGES_DEAD); 
        this.isDeadChicken = true;
        setTimeout(() => {
            this.removeChicken();
        }, 1000); 
    }

    removeChicken() {
        this.isRemovable = true;
    }
}
