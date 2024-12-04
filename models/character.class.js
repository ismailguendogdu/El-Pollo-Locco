class Character extends MovableObject {

    height = 250;
    y = 80;
    speed = 10;

    isDashing = false;
    dashDistance = 300;
    dashDuration = 200;
    dashCooldown = 1000;
    lastDashTime = 0;
    

    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 30
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    world;

    idleTime;
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
   

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);


        if (!window.walking_sound) {
            window.walking_sound = new Audio('audio/walking.mp3');
            window.allSounds.push(window.walking_sound);
        }

        if (!window.jumping_sound) {
            window.jumping_sound = new Audio('audio/jump.mp3');
            window.allSounds.push(window.jumping_sound);
        }

        this.walking_sound = window.walking_sound;
        this.jumping_sound = window.jumping_sound;
        
        this.applyGravity();
        this.animate();
    }

    isInvulnerable() {
        return this.isHurt();
    }

    hit() {
        if (!this.isInvulnerable()) {
            this.energy -= 20; 
            if (this.energy <= 0) {
                this.energy = 0;
                this.world.endGame('lose');
            } else {
                this.lastHit = new Date().getTime();
            }
            this.world.statusBar.setPercentage(this.energy);
        }
    }
    
    dash() {
        if (!this.isDashing && this.canDash()) {
            this.isDashing = true;
            this.lastDashTime = new Date().getTime();
    
            let dashDirection = this.otherDirection ? -1 : 1;
            let totalDashDistance = dashDirection * this.dashDistance;
            let dashStartTime = new Date().getTime();
            let startX = this.x; 
    
            let dashInterval = setInterval(() => {
                let currentTime = new Date().getTime();
                let elapsedTime = currentTime - dashStartTime;
                let progress = elapsedTime / this.dashDuration;
    
                if (progress >= 1) {
                    progress = 1;
                }
                this.x = startX + (totalDashDistance * progress);
                this.x = Math.max(0, Math.min(this.x, this.world.level.level_end_x));
    
                if (progress >= 1) {
                    clearInterval(dashInterval);
                    this.isDashing = false;
                }
            }, 1000 / 60);
        }
    }
    
    canDash() {
        let currentTime = new Date().getTime();
        return (currentTime - this.lastDashTime) >= this.dashCooldown;
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause();
    
            if (this.world.keyboard.SHIFT && !this.isDashing) {
                this.dash();
            } else if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isDashing) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                this.resetIdleTime();
            } else if (this.world.keyboard.LEFT && this.x > 0 && !this.isDashing) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
                this.resetIdleTime();
            }
    
            if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDashing) {
                this.jump();
                this.jumping_sound.play();
                this.resetIdleTime();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if(this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.startIdleTime();
            }  
        }, 50);
        
        this.playAnimation(this.IMAGES_IDLE);
    }

    startIdleTime() {
        this.idleTime = setTimeout(() => {
            this.playAnimation(this.IMAGES_IDLE);
        }, 3000);
    }

    resetIdleTime() {
        clearTimeout(this.idleTime);
        this.startIdleTime();
    }

    jump() {
       this.speedY = 30;
    }
}