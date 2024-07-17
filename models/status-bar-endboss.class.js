class StatusBarEndboss extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    percetage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 480;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    //setPercentage(50)
    setPercentage(percetage) {
        this.percetage = percetage; // => 0...5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }
    
        resolveImageIndex() {
            if(this.percetage == 100) {
                return 5;
            } else if(this.percetage > 80) {
                return 4;
            } else if(this.percetage > 60) {
                return 3;
            } else if(this.percetage > 40) {
                return 2;
            } else if(this.percetage > 20) {
                return 1;
            } else {
                return 0;
            }
        }
}