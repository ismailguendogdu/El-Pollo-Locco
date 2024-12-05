class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  energyEndboss = 100;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
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
 * Handles the animation and movement logic for the chicken character.
 * This method sets up two intervals: 
 *   The first interval checks if the chicken is alive. If it is not dead, 
 *   it evaluates whether the chicken is damaged. If damaged, it plays the 
 *   hurt animation; otherwise, it moves the chicken to the left. A timeout 
 *   resets the damage state after 2000 milliseconds (2 seconds).
 *   The second interval plays the walking animation every second if the 
 *   chicken is not dead.
 * 
 * If the chicken is dead, it plays the dead animation and calls 
 * `removeChicken` to mark it for removal from the game.

 */

  animate() {
    setInterval(() => {
      if (!this.isDeadChicken) {
        if (this.isDamage) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.moveLeft();
        }

        setTimeout(() => {
          this.isDamage = false;
        }, 2000);
      } else {
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.playAnimation(this.IMAGES_DEAD);
          this.removeChicken();
        }
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!this.isDeadChicken) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000);
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
