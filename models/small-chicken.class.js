class SmallChicken extends MovableObject {
  height = 50;
  y = 370;
  width = 60;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.x = 200 + Math.random() * 500;
    this.speed = 0.15 + Math.random() * 0.5;

    this.isDeadChicken = false;
    this.isRemovable = false;

    this.animate();
  }

  /**
   * Handles the animation and movement logic for the character.
   *
   * This method sets up two intervals:
   * - The first interval moves the character to the left at a rate of 60 frames
   *   per second if the character is not dead.
   * - The second interval plays the walking animation every 200 milliseconds
   *   if the character is not dead.
   *
   * Both intervals rely on the `isDeadChicken` flag to determine if the
   * character should continue moving or animating.
   */
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

  /**
   * Handles the death of the chicken character.
   * This method loads the dead image for the chicken and sets the
   * `isDeadChicken` flag to true, indicating that the chicken is no longer active.
   * It also sets a timeout to remove the chicken from the game after a delay of
   * 700 milliseconds (0.7 seconds).
   */
  dieChicken() {
    this.loadImage(this.IMAGES_DEAD);
    this.isDeadChicken = true;
    setTimeout(() => {
      this.removeChicken();
    }, 700);
  }

  /**
   * Marks the chicken as removable from the game.
   * This method sets the `isRemovable` flag to true, indicating that the
   * chicken can be safely removed from the game environment during the next
   * update cycle.
   */
  removeChicken() {
    this.isRemovable = true;
  }
}
