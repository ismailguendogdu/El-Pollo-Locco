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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the character, affecting its vertical position.
   * This method sets up an interval that updates the vertical position (`y`)
   * of the character based on its current vertical speed (`speedY`). If the
   * character is above the ground or moving upwards, it decreases the `y` position.
   * The vertical speed is then reduced by the acceleration value (`acceleration`).
   * The updates occur at a rate of 25 frames per second.
   */

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the character is above the ground.
   * This method determines if the character is above the ground level.
   * If the instance is of type `ThrowableObject`, it returns `true`.
   * Otherwise, it checks if the vertical position (`y`) is less than
   * 180 pixels, indicating that the character is above the ground.
   */

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Checks for a collision between this object and another object.
   * This method determines if there is an overlap between the bounding
   * boxes of this object and another object (`mo`). It takes into account
   * the position and dimensions of both objects, including any defined
   * offsets. The method returns `true` if a collision is detected,
   * otherwise it returns `false`.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Increases the bottle bar by a specified amount when a bottle is collected.
   * This method increments the `bottleBar` by 20 when a bottle is collected.
   * If the resulting value exceeds 100, it caps the `bottleBar` at 100 to
   * ensure it does not exceed the maximum limit.
   */
  collect;
  collectBottle() {
    this.bottleBar += 20;
    if (this.bottleBar > 100) {
      this.bottleBar = 100;
    }
  }

  /**
   * Increases the coins bar by a specified amount when coins are collected.
   * This method increments the `coinsBar` by 11.11 when coins are collected.
   * If the resulting value exceeds 100, it caps the `coinsBar` at 100 to
   * ensure it does not exceed the maximum limit.
   */

  collectCoins() {
    this.coinsBar += 11.11;
    if (this.coinsBar > 100) {
      this.coinsBar = 100;
    }
  }

  /**
   * Records the time of the last hit.
   * This method updates the `lastHit` property with the current timestamp,
   * indicating when the character was last hit. This information can be
   * used for various game mechanics, such as cooldowns or effects related
   * to being hit.
   */
  hit() {
    this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the character is currently hurt based on the last hit time.
   * This method calculates the time elapsed since the last hit by subtracting
   * the `lastHit` timestamp from the current time. It returns `true` if less
   * than 1 second has passed since the last hit, indicating that the character
   * is still in a hurt state; otherwise, it returns `false`.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the character is dead based on its energy level.
   * This method returns `true` if the character's energy is equal to zero,
   * indicating that the character is dead. Otherwise, it returns `false`.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Plays the next frame of the animation using the provided image array.
   * This method updates the current image being displayed by cycling through
   * the array of images. It uses the `currentImage` index to select the next
   * image and updates the image to be displayed. The `currentImage` index is
   * incremented for the next call, allowing for frame-by-frame animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the character to the right by increasing its x-coordinate.
   * This method updates the horizontal position of the character by adding
   * the current speed to the `x` coordinate, effectively moving the character
   * to the right.
   */

  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the character to the left by decreasing its x-coordinate.
   * This method updates the horizontal position of the character by subtracting
   * the current speed from the `x` coordinate, effectively moving the character
   * to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Initiates a jump by setting the vertical speed.
   * This method sets the vertical speed (`speedY`) of the character to a
   * predefined value, allowing the character to jump. The value assigned
   * to `speedY` determines the height and speed of the jump.
   */
  jump() {
    this.speedY = 30;
  }
}
