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
  collectBottles = 0;
  gameEnded = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Sets the world context for the character.
   * This method assigns the current world instance (`this`) to the
   * `world` property of the character. This allows the character to
   * reference its associated world for game logic and interactions.
   */

  setWorld() {
    this.character.world = this;
  }

  /**
   * Initiates the game loop for collision checks and object interactions.
   * This method sets up an interval that repeatedly checks for collisions
   * between the character and various objects, including bottles and coins,
   * as well as handling thrown objects and their collisions. The checks are
   * performed every 100 milliseconds to ensure timely updates during gameplay.
   */

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsBottles();
      this.checkCollisionsCoins();
      this.checkThrowObjects();
      this.checkThrowBottleCollisions();
    }, 100);
  }

  /**
   * Checks for user input to throw objects and updates the game state accordingly.
   *
   * This method verifies if the 'D' key is pressed and if there are bottles
   * available to throw. If both conditions are met, it calculates the position
   * for the bottle based on the character's direction, creates a new `ThrowableObject`,
   * and adds it to the `throwableObjects` array. It also decrements the
   * bottle count and updates the character's bottle bar percentage.
   */

  checkThrowObjects() {
    if (this.keyboard.D && this.collectBottles > 0) {
      let bottleX = this.character.otherDirection
        ? this.character.x - 10
        : this.character.x + 10;
      let bottle = new ThrowableObject(
        bottleX,
        this.character.y,
        this.character.otherDirection
      );
      this.throwableObjects.push(bottle);
      this.collectBottles--;
      this.character.bottleBar -= 20;
      this.statusBarBottles.setPercentage(this.character.bottleBar);
    }
  }

  /**
   * Checks for collisions between the character and enemies in the level.
   * This method iterates through the list of enemies in the level and checks
   * for collisions with the character. If a collision is detected:
   * - If the enemy is an `Endboss`, the character takes damage unless it is
   *   invulnerable. If the character's energy drops to 0 or below, the game
   *   ends with a loss.
   * - If the character is above the enemy and moving downwards, the enemy is
   *   killed and removed from the level after a delay.
   * - If the character collides with the enemy from above, it takes damage
   *   unless it is invulnerable.
   */

  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      if (!enemy.isDeadChicken && this.character.isColliding(enemy)) {
        if (enemy instanceof Endboss) {
          if (!this.character.isInvulnerable()) {
            this.character.hit(20);
            this.statusBar.setPercentage(this.character.energy);

            if (this.character.energy <= 0) {
              this.endGame("lose");
            }
          }
        } else if (
          this.character.y + this.character.height - 50 < enemy.y &&
          this.character.speedY <= 0
        ) {
          enemy.dieChicken();
          setTimeout(() => {
            this.level.enemies.splice(i, 1);
          }, 1500);
        } else if (this.character.y + this.character.height >= enemy.y) {
          if (!this.character.isInvulnerable()) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
          }
        }
      }
    });
  }

  /**
   * Checks for collisions between a thrown bottle and the Endboss.
   * This method verifies if the given bottle is colliding with the Endboss.
   * If a collision is detected, the Endboss takes damage, the energy bar is
   * updated, and the bottle is removed from the list of throwable objects.
   * If the Endboss's energy drops to 0 or below, it is marked as dead, and
   * the game ends with a win after a delay.
   */

  checkCollisionsEndboss(bottle, boss, bottleIndex) {
    if (bottle.isColliding(boss)) {
      boss.hit();
      this.statusBarEndboss.setPercentage(boss.energyEndboss);
      this.throwableObjects.splice(bottleIndex, 1);

      if (boss.energyEndboss <= 0) {
        boss.dieEndboss();

        setTimeout(() => {
          this.endGame("win");
        }, 1500);
      }
    }
  }

  /**
   * Checks for collisions between thrown bottles and enemies.
   * This method iterates through all throwable objects (bottles) and checks
   * for collisions with the enemies in the level. If a collision is detected:
   * - If the enemy is an `Endboss`, it calls the `checkCollisionsEndboss`
   *   method to handle the collision.
   * - For other enemies, both the enemy and the bottle are removed from their
   *   respective lists.
   */

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

  /**
   * Checks for collisions between the character and salsa bottles.
   * This method iterates through all salsa bottles in the level and checks
   * for collisions with the character. If a collision is detected and the
   * character has fewer than 5 bottles collected, it increments the bottle
   * count, updates the character's bottle bar, and removes the collected
   * bottle from the level.
   */
  checkCollisionsBottles() {
    this.level.salsaBottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        if (this.collectBottles < 5) {
          this.collectBottles++;
          this.character.collectBottle();
          this.statusBarBottles.setPercentage(this.character.bottleBar);
        }
        this.level.salsaBottles.splice(i, 1);
      }
    });
  }

  /**
   * Checks for collisions between the character and coins.
   * This method iterates through all the coins in the level and checks
   * for collisions with the character. If a collision is detected, the
   * character collects the coin, updates the coins bar, and removes the
   * collected coin from the level.
   */

  checkCollisionsCoins() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoins();
        this.statusBarCoins.setPercentage(this.character.coinsBar);
        this.level.coins.splice(i, 1);
      }
    });
  }

  /**
   * Ends the game and displays the appropriate end screen based on the result.
   * This method checks if the game has already ended. If not, it sets the
   * `gameEnded` flag to true, displays the end screen, and updates its
   * background image based on whether the player won or lost. It also
   * clears the game canvas.
   */

  endGame(result) {
    if (this.gameEnded) return;

    this.gameEnded = true;
    const endScreen = document.getElementById("endScreen");
    endScreen.style.display = "block";

    if (result === "win") {
      endScreen.style.backgroundImage =
        "url('img/9_intro_outro_screens/win/win_2.png')";
    } else if (result === "lose") {
      endScreen.style.backgroundImage =
        "url('img/9_intro_outro_screens/game_over/oh no you lost!.png')";
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Renders the game objects on the canvas.
   * This method clears the canvas and checks if the game has ended. If the
   * game is still active, it translates the canvas context based on the camera
   * position and adds various game objects to the map, including the background,
   * status bars, character, clouds, enemies, and collectible items. It uses
   * `requestAnimationFrame` to create a smooth animation loop for continuous
   * rendering.
   */

  draw() {
    if (this.gameEnded) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarBottles);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.salsaBottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map for rendering.
   * This method iterates through an array of objects and calls the
   * `addToMap` method for each object, allowing them to be rendered
   * on the canvas.
   */

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds an object to the map for rendering.
   * This method checks if the object is facing the other direction and flips
   * the image if necessary before drawing the object on the canvas. After
   * drawing, it checks again to flip the image back to its original orientation.
   */

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an object horizontally for rendering.
   * This method saves the current canvas state, translates the context
   * to the object's width, and scales the context to flip the image.
   * It also adjusts the object's x-coordinate to reflect the flip.
   */

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas state and adjusts the object's position back after flipping.
   * This method reverses the x-coordinate of the object to reflect its original
   * position after being flipped, and restores the previous canvas state to
   * undo the flipping transformation.
   */

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

/**
 * Initializes the privacy policy popup functionality when the DOM is fully loaded.
 * This script listens for the click event on the privacy button to toggle the
 * visibility of the privacy text and the overlay. It also handles closing the
 * popup when the overlay or a close button is clicked.
 */

document.addEventListener("DOMContentLoaded", () => {
  const privacyBtn = document.querySelector(".privacy-btn");
  const privacyText = document.querySelector(".privacy-text");
  const overlay = document.createElement("div");

  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  privacyBtn.addEventListener("click", () => {
    privacyText.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", closePopup);
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-btn")) {
      closePopup();
    }
  });

  function closePopup() {
    privacyText.classList.remove("active");
    overlay.classList.remove("active");
  }
});

/**
 * Initializes the popup functionality when the DOM is fully loaded.
 * This script sets up event listeners for a control button to show the popup
 * and for a close button and overlay to hide the popup. When the control button
 * is clicked, the popup and overlay become visible. The popup can be closed by
 * clicking either the close button or the overlay itself.
 */

document.addEventListener("DOMContentLoaded", () => {
  const controlButton = document.getElementById("controlButton");
  const popup = document.querySelector(".popup");
  const closeBtn = document.querySelector(".close-btn");
  const overlay = document.querySelector(".overlay");

  controlButton.addEventListener("click", () => {
    popup.classList.add("active");
    overlay.classList.add("active");
  });

  closeBtn.addEventListener("click", closePopup);
  overlay.addEventListener("click", closePopup);

  function closePopup() {
    popup.classList.remove("active");
    overlay.classList.remove("active");
  }
});

/**
 * Displays the privacy policy popup and resets its scroll position.
 * This function makes the privacy text visible by setting its display style
 * to 'block'. It also ensures that the scroll position of the privacy text
 * is reset to the top, providing a clear view of the content when it is displayed.
 */

function showPrivacyPopup() {
  const privacyText = document.querySelector(".privacy-text");
  privacyText.style.display = "block";
  privacyText.scrollTop = 0;
}

/**
 * Checks the current window orientation and displays a warning if in portrait mode.
 * This function compares the window's height and width to determine the
 * orientation. If the window is taller than it is wide (portrait mode),
 * it sets the display style of the orientation warning element to 'flex',
 * making it visible. If the window is wider than it is tall (landscape mode),
 * it hides the warning by setting its display style to 'none'.
 */

function checkOrientation() {
  const orientationWarning = document.getElementById("orientationWarning");
  if (window.innerHeight > window.innerWidth) {
    orientationWarning.style.display = "flex";
  } else {
    orientationWarning.style.display = "none";
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
