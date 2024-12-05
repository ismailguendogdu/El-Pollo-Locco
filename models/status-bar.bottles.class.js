class StatusBarBottles extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percetage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 40;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage();
  }

  /**
   * Sets the percentage value and updates the character's image accordingly.
   * This method assigns a new value to the `percentage` property and updates
   * the character's image based on the current percentage by resolving the
   * appropriate image index.
   */
  setPercentage(percetage) {
    this.percetage = percetage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the image index based on the current percentage value.
   * This method returns an index corresponding to the current `percentage`
   * value, which determines which image to display. The index is assigned
   * based on defined percentage ranges:
   * - 100% corresponds to index 5
   * - 80% to 99% corresponds to index 4
   * - 60% to 79% corresponds to index 3
   * - 40% to 59% corresponds to index 2
   * - 20% to 39% corresponds to index 1
   * - 0% to 19% corresponds to index 0
   */
  resolveImageIndex() {
    if (this.percetage == 100) {
      return 5;
    } else if (this.percetage >= 80) {
      return 4;
    } else if (this.percetage >= 60) {
      return 3;
    } else if (this.percetage >= 40) {
      return 2;
    } else if (this.percetage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
