class Coins extends MovableObject {
  height = 160;
  width = 150;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 100 + Math.random() * 200;
  }
}
