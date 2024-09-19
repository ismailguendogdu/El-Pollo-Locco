class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarBottles = new StatusBarBottles();
    statusBarCoins = new StatusBarCoins();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    // salsaBottles = [];
    // coins = [];
    collectBottles = 0;
    gameEnded = false;
    

 

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    setWorld() {
        this.character.world = this;
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollisionsBottles();
            this.checkCollisionsCoins();
            this.checkThrowObjects();
            this.checkThrowBottleCollisions();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectBottles > 0) {
            let bottleX = this.character.otherDirection ? this.character.x - 10 : this.character.x + 10;
            let bottle = new ThrowableObject(bottleX, this.character.y, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.collectBottles--;
            this.statusBarBottles.setPercentage(this.collectBottles);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy, i) => {
            if (!enemy.isDeadChicken && this.character.isColliding(enemy)) {
                if (this.character.y + this.character.height - 50 < enemy.y 
                    && this.character.speedY <= 0) {
                    enemy.dieChicken();
                    setTimeout(() => {
                        this.level.enemies.splice(i, 1);
                    }, 1000);
                } 
                else if (this.character.y + this.character.height >= enemy.y) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }
    
        
    checkCollisionsEndboss(bottle, boss) {
        if (bottle.isColliding(boss)) {
            boss.isHurt();
            boss.hit();
            boss.energyEndboss -= 20;
            this.statusBarEndboss.setPercentage(boss.energyEndboss);
            
            if (boss.energyEndboss > 0) {
                boss.isHurt();
            } else if (boss.energyEndboss <= 0) {
                boss.dieEndboss();
                this.endGame('win');
            }
        }
    }
    
    checkThrowBottleCollisions() {
        this.throwableObjects.forEach((bottle, b) => {
            this.level.enemies.forEach((enemy, e) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof Endboss) {
                        this.checkCollisionsEndboss(bottle, enemy);
                    } else {
                        this.level.enemies.splice(e, 1); 
                        this.throwableObjects.splice(b, 1); 
                    }
                }
            });
        });
    }
    

    checkCollisionsBottles() {
        this.level.salsaBottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottles ++;
                // this.statusBarBottles.setPercentage(this.collectBottles);
                this.character.collectBottle();
                this.statusBarBottles.setPercentage(this.character.bottleBar);
                this.level.salsaBottles.splice(i, 1);
            }
        });
    }

    checkCollisionsCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins();
                this.statusBarCoins.setPercentage(this.character.coinsBar);
                this.level.coins.splice(i, 1);
            }
        });
    }

    endGame(result) {
        this.gameEnded = true;
        const endScreen = document.getElementById('endScreen');
        endScreen.style.display = 'block';
    
        if (result === 'win') {
            endScreen.style.backgroundImage = "url('img/9_intro_outro_screens/win/win_2.png')";
        } else if (result === 'lose') {
            endScreen.style.backgroundImage = "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')";
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    

    // Draw() wird immer wieder aufgerufen
    draw() {

        if (this.gameEnded) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0); // Forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.salsaBottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        

        this.ctx.translate(-this.camera_x, 0);

        
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
           this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}