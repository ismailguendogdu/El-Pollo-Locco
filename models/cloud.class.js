class Cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 250;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
    
        this.x = Math.random() * 500; // Zahl zwischen 200 und 700

        this.animate();
        
        }

// wolken 60 pro sekunde mit 0,1 px bewegen lassen
        animate() {
            setInterval(() => {
            this.x -= 0.1;
            },1000 / 60);
        }
}