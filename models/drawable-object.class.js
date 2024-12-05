class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  height = 150;
  width = 100;

  /** Loads an image from the specified path. */

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the loaded image onto the canvas.
   * This method uses the provided canvas rendering context (`ctx`) to draw
   * the image at the specified position (`x`, `y`) with the defined width
   * and height. This allows the object to be rendered visually in the game.
   */

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  /**
   * Draws a blue frame around the object if it is a specific type.
   * This method checks if the current instance is one of the following classes:
   * `Character`, `Chicken`, `SmallChicken`, `Endboss`, or `SalsaBottles`.
   * If it is, it draws a blue rectangle around the object using the specified
   * dimensions (`x`, `y`, `width`, `height`) on the provided canvas rendering
   * context (`ctx`). This can be useful for debugging purposes.
   */

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof SmallChicken ||
      this instanceof Endboss ||
      this instanceof SalsaBottles
    ) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Loads multiple images from the specified array of paths.
   * This method iterates over an array of image paths, creates a new
   * `Image` object for each path, and sets its source. Each loaded image
   * is stored in the `imageCache` for later use, allowing for efficient
   * rendering without reloading the images.
   */

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
