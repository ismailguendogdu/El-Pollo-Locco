class ThrowableObject extends MovableObject {
  IMAGES_BOTTLES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x, y, otherDirection) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLES);
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 40;
    this.throw(otherDirection);
  }

  /**
   * Throws the character in a specified direction.
   * This method sets the vertical speed (`speedY`) to initiate upward movement
   * and applies gravity to the character. It determines the horizontal throw
   * speed based on the `otherDirection` parameter, setting it to 10 or -10
   * depending on the direction. It then updates the horizontal position (`x`)
   * of the character at a regular interval.
   */
  throw(otherDirection) {
    this.speedY = 20;
    this.applyGravity();
    let throwSpeed = 10;

    if (otherDirection) {
      throwSpeed = -10;
    }

    setInterval(() => {
      this.x += throwSpeed;
    }, 25);
  }
}
