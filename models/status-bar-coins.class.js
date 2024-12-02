class StatusBarCoins extends DrawableObject {

    IMAGES = [
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
      'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];

    percetage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        if (this.percentage > 100) {
            this.percentage = 100;
        } else if (this.percentage < 0) {
            this.percentage = 0;
        }
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.percetage == 100) {
            return 5;
        } else if(this.percetage >= 80) {
            return 4;
        } else if(this.percetage >= 60) {
            return 3;
        } else if(this.percetage >= 40) {
            return 2;
        } else if(this.percetage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}