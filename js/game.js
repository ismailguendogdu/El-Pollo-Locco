let canvas;
let world;
let keyboard = new Keyboard();
let startButton;
let ctx;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // world = new World(canvas, keyboard);
    startButton = document.getElementById('startButton');

    drawStartScreen();

    // startButton.style.display = 'block';
    // startButton.addEventListener('click', startGame);

}

function drawStartScreen() {
    const startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
    startImage.onload = () => {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
        startButton.style.display = 'block'; 
    };
}

function startGame() {
    startButton.style.display = 'none';

    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    
    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }

});

window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    
    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});