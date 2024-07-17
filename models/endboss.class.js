class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 55;


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    isDeadChicken = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.speed = 0.15 + Math.random() * 1.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDeadChicken) {
                this.moveLeft();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } 
            // else {
            //     this.isDeadChicken = true;
            //     this.playAnimation(this.IMAGES_DEAD);
            // }
        }, 1000 / 60);
        
        setInterval(() => {
            if (!this.isDeadChicken) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    dieEndboss() {
        this.isDeadChicken = true;
        this.playAnimation(this.IMAGES_DEAD); 
        setTimeout(() => {
            this.removeChicken();
        }, 1000); 
    }

    removeChicken() {
        this.isRemovable = true;
    }
}