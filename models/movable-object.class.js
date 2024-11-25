class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    bottleBar = 0;
    coinsBar = 0;
    energyEndboss = 100;

    offset = {
        top : 0,
        left : 0,
        right : 0,
        bottom : 0
    };
    



    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    collectBottle() {
        this.bottleBar += 20;
        if (this.bottleBar > 100) {
            this.bottleBar = 100;
        }
    }

    collectCoins() {
        this.coinsBar += 11.11;
        if (this.coinsBar > 100) {
            this.coinsBar = 100;
        }
    }

    hit() {

        this.lastHit = new Date().getTime();
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;          
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
   
    // if (character.x + character.width > chicken.x &&      
    //     character.y + character.height > chicken.y &&   
    //     character.x < chicken.x &&   
    //     character.y < chicken.y + chicken.height   
    // )

    // isColliding (obj) {
    //     return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
    //             (this.Y + this.offsetY + this.height) >= obj.Y &&
    //             (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
    //             obj.onCollisionCourse;
}