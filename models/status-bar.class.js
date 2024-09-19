class StatusBar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png' // 5
    ];

    percetage = 200;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(200);
    }

    //setPercentage(50)
    setPercentage(percetage) {
        this.percetage = percetage; // => 0...5
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }
    
        resolveImageIndex() {
            if(this.percetage == 200) {
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

