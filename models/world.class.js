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
          this.character.bottleBar -= 20; // Enerji barını güncelle
          this.statusBarBottles.setPercentage(this.character.bottleBar);
      }
  }


  checkCollisions() {
      this.level.enemies.forEach((enemy, i) => {
          if (!enemy.isDeadChicken && this.character.isColliding(enemy)) {
              if (enemy instanceof Endboss) {
                  // Karakter Endboss ile çarpıştıysa
                  this.character.energy = 0;
                  this.statusBar.setPercentage(this.character.energy);
                  this.endGame('lose');
              } else if (this.character.y + this.character.height - 50 < enemy.y 
                  && this.character.speedY <= 0) {
                  enemy.dieChicken();
                  setTimeout(() => {
                      this.level.enemies.splice(i, 1);
                  }, 1000);
              } 
              else if (this.character.y + this.character.height >= enemy.y) {
                  if (!this.character.isInvulnerable()) {
                      this.character.hit();
                      this.statusBar.setPercentage(this.character.energy);
                  }
              }
          }
      });
  }
  
  
      
  checkCollisionsEndboss(bottle, boss, bottleIndex) {
      if (bottle.isColliding(boss)) {
          boss.hit();
          this.statusBarEndboss.setPercentage(boss.energyEndboss);
  
          // Şişeyi sahneden kaldır
          this.throwableObjects.splice(bottleIndex, 1);
  
          if (boss.energyEndboss <= 0) {
              boss.dieEndboss();

              setTimeout(() => {
                  this.endGame('win');
              }, 1000);

          }
      }
  }
  
  checkThrowBottleCollisions() {
      this.throwableObjects.forEach((bottle, b) => {
          this.level.enemies.forEach((enemy, e) => {
              if (bottle.isColliding(enemy)) {
                  if (enemy instanceof Endboss) {
                      this.checkCollisionsEndboss(bottle, enemy, b);
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
              if (this.collectBottles < 5) { // Maksimum 5 şişe
                  this.collectBottles++;
                  this.character.collectBottle();
                  this.statusBarBottles.setPercentage(this.character.bottleBar);
              }
              // Şişeyi her durumda kaldır
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
      //

          if(this.gameEnded) return;

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

document.addEventListener('DOMContentLoaded', () => {
    const privacyBtn = document.querySelector('.privacy-btn');
    const privacyText = document.querySelector('.privacy-text');
    const overlay = document.createElement('div');
    const closeBtn = document.querySelector('.close-btn');
    
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  
    privacyBtn.addEventListener('click', () => {
      privacyText.classList.toggle('active');
      overlay.classList.toggle('active');
    });
  
    overlay.addEventListener('click', closePopup);
    closeBtn.addEventListener('click', closePopup);
  
    function closePopup() {
      privacyText.classList.remove('active');
      overlay.classList.remove('active');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const controlButton = document.getElementById('controlButton');
    const popup = document.querySelector('.popup');
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.querySelector('.overlay');
  
    // Öffnet das Popup
    controlButton.addEventListener('click', () => {
      popup.classList.add('active');
      overlay.classList.add('active');
    });
  
    // Schließt das Popup
    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
  
    function closePopup() {
      popup.classList.remove('active');
      overlay.classList.remove('active');
    }
  });