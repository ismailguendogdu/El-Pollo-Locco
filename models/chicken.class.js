class Chicken extends MovableObject {
  height = 50;
  y = 370;
  width = 60;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * Initializes a new instance of the character class.
   * This constructor calls the parent class's constructor to load the initial
   * walking image. It also loads all walking images, sets the initial position
   * (`x`) randomly within a specified range, and assigns a random speed.
   * Additionally, it initializes flags to determine if the character is dead
   * or removable. Finally, it starts the animation loop.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 800;
    this.speed = 0.15 + Math.random() * 0.5;
    this.isDeadChicken = false;
    this.isRemovable = false;
    this.animate();
  }

  /**
   * Handles the animation and movement logic for the character.
   * This method sets up two intervals: one for moving the character to the left
   * and another for playing the walking animation. Both intervals check if the
   * character is not dead before executing their respective actions. The movement
   * interval runs at 60 frames per second, while the animation update runs every
   * 200 milliseconds to refresh the animation frames.
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
   *
   * This method loads the dead image for the chicken and sets the
   * `isDeadChicken` flag to true, indicating that the chicken is no longer active.
   * It also sets a timeout to remove the chicken from the game after a delay of
   * 1000 milliseconds (1 second).
   */
  dieChicken() {
    this.loadImage(this.IMAGES_DEAD);
    this.isDeadChicken = true;
    setTimeout(() => {
      this.removeChicken();
    }, 1000);
  }

  /**
   * Marks the chicken as removable from the game.
   * This method sets the `isRemovable` flag to true, indicating that the chicken
   * can be safely removed from the game environment during the next update cycle.
   */
  removeChicken() {
    this.isRemovable = true;
  }
}
