class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  energyEndboss = 100;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  isDeadChicken = false;
  isDamage = false;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.speed = 0.15 + Math.random() * 1.5;
    this.animate();
  }

  /**
   * Initiates the animation process for the character.
   * This function sets up two intervals: one for updating the character's
   * movement at a frame rate of 60 frames per second, and another for
   * updating the character's animation state at a rate of every 250 milliseconds.
   */
  animate() {
    setInterval(() => {
      this.updateMovement();
    }, 1000 / 60);

    setInterval(() => {
      this.updateAnimation();
    }, 250);
  }

  /**
   * Updates the movement state of the character based on its health status.
   * This function checks if the character (chicken) is dead. If the character
   * is not dead, it calls the `handleDamage` method to process any damage
   * taken. If the character is dead, it calls the `handleDeadChicken` method
   * to manage its behavior when deceased.
   */
  updateMovement() {
    if (!this.isDeadChicken) {
      this.handleDamage();
    } else {
      this.handleDeadChicken();
    }
  }

  /**
   * Handles the character's response to taking damage.
   * This function checks if the character is in a damaged state. If the character
   * is damaged, it plays the hurt animation and resets the damage status. If the
   * character is not damaged, it continues to move left.
   */
  handleDamage() {
    if (this.isDamage) {
      this.playAnimation(this.IMAGES_HURT);
      this.resetDamageStatus();
    } else {
      this.moveLeft();
    }
  }

  /**
   * Resets the damage status of the character after a delay.
   * This function sets a timeout to change the `isDamage` property to
   * `false` after a period of 2000 milliseconds (2 seconds). This allows
   * the character to recover from the damaged state after a brief duration.
   */
  resetDamageStatus() {
    setTimeout(() => {
      this.isDamage = false;
    }, 2000);
  }

  /**
   * Handles the behavior of the character when it is dead.
   * This function checks if the character is in a hurt state. If the character
   * is hurt, it plays the hurt animation. If the character is not hurt, it
   * plays the dead animation and removes the chicken from the game.
   */
  handleDeadChicken() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      this.playAnimation(this.IMAGES_DEAD);
      this.removeChicken();
    }
  }

  /**
   * Updates the character's animation state based on its health status.
   * This function checks if the character (chicken) is alive. If the character
   * is not dead, it plays the walking animation. This function is typically
   * called in the animation loop to ensure the character's animation reflects
   * its current state.
   */
  updateAnimation() {
    if (!this.isDeadChicken) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Applies damage to the endboss character.
   * This method sets the damage state to true, reduces the endboss's energy
   * by 20, and checks if the energy has dropped below zero. If so, it sets
   * the energy to zero and calls the `dieEndboss` method to handle the endboss's death.
   * Additionally, it adjusts the speed of the endboss and records the timestamp
   * of the last hit.
   */
  hit() {
    this.isDamage = true;
    this.energyEndboss -= 20;
    if (this.energyEndboss < 0) {
      this.energyEndboss = 0;
      this.dieEndboss();
    }
    this.adjustSpeed();
    this.lastHit = new Date().getTime();
  }

  /**
   * Adjusts the speed of the endboss based on its remaining energy.
   * This method calculates the current speed of the endboss by determining
   * the energy percentage relative to a maximum energy of 100.
   * The speed is adjusted to be between a minimum speed and a maximum speed,
   * allowing the endboss to slow down as its energy decreases.
   */
  adjustSpeed() {
    let maxSpeed = 4;
    let minSpeed = 0.5;
    let energyPercentage = this.energyEndboss / 100;
    this.speed = minSpeed + (1 - energyPercentage) * (maxSpeed - minSpeed);
  }

  /**
   * Handles the death of the endboss character.
   * This method sets the `isDeadChicken` flag to true, indicating that the
   * endboss is no longer active. It plays the dead animation using the
   * `IMAGES_DEAD` array. After a delay of 2500 milliseconds (2.5 seconds),
   * it calls the `removeChicken` method to mark the endboss for removal
   * from the game.
   */
  dieEndboss() {
    this.isDeadChicken = true;
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => {
      this.removeChicken();
    }, 2500);
  }

  /**
   * Marks the endboss as removable from the game.
   * This method sets the `isRemovable` flag to true, indicating that the
   * endboss can be safely removed from the game environment during the next
   * update cycle.
   */
  removeChicken() {
    this.isRemovable = true;
  }
}
