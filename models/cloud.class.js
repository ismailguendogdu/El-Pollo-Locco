class Cloud extends MovableObject {
  y = 50;
  width = 500;
  height = 250;

  /**
   * Initializes a new instance of the background cloud layer.
   *
   * This constructor calls the parent class's constructor to load the initial
   * cloud image. It also sets the horizontal position (`x`) of the cloud to a
   * random value within a specified range. Finally, it starts the animation loop
   * for the cloud.
   */
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 500;
    this.animate();
  }

  /**  Handles the animation logic for the cloud. */

  animate() {
    this.moveLeft();
  }

  /**
   * Moves the cloud to the left at a constant speed.
   * This method sets up an interval that continuously decreases the
   * horizontal position (`x`) of the cloud by the value of `speed`.
   * This creates a leftward movement effect. The movement is updated
   * at a rate of 60 frames per second.
   */

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
