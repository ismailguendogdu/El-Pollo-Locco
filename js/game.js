let canvas;
let world;
let keyboard = new Keyboard();
let startButton;
let ctx;
let playAgainButton;
let endScreen;

document.addEventListener('DOMContentLoaded', () => {
    
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    startButton = document.getElementById('startButton');
    playAgainButton = document.getElementById('playAgainButton');
    endScreen = document.getElementById('endScreen');

    drawStartScreen();

    startButton.style.display = 'block';
    startButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', playAgain);
    fullScreenButton();

 
    document.getElementById("leftBtn")?.addEventListener("touchstart", () => {
        keyboard.LEFT = true;
        simulateKeydown(37);
    });

    document.getElementById("rightBtn")?.addEventListener("touchstart", () => {
        keyboard.RIGHT = true;
        simulateKeydown(39);  
    });

    document.getElementById("attackBtn")?.addEventListener("touchstart", () => {
        keyboard.UP = true;
        simulateKeydown(68);  
    });

    document.getElementById("upBtn")?.addEventListener("touchstart", () => {
        keyboard.SPACE = true;  
        simulateKeydown(38); 
    });

    
    document.getElementById("leftBtn")?.addEventListener("touchend", () => {
        keyboard.LEFT = false;
        simulateKeyup(37);  
    });

    document.getElementById("rightBtn")?.addEventListener("touchend", () => {
        keyboard.RIGHT = false;
        simulateKeyup(39);  
    });

    document.getElementById("attackBtn")?.addEventListener("touchend", () => {
        keyboard.UP = false;
        simulateKeyup(68); 
    });

    document.getElementById("upBtn")?.addEventListener("touchend", () => {
        keyboard.SPACE = false; 
        simulateKeyup(38); 
    });


    window.addEventListener('keydown', (e) => {
        if(e.keyCode == 39) { keyboard.RIGHT = true; }
        if(e.keyCode == 37) { keyboard.LEFT = true; }
        if(e.keyCode == 38) { keyboard.UP = true; }
        if(e.keyCode == 40) { keyboard.DOWN = true; }
        if(e.keyCode == 32) { keyboard.SPACE = true; }
        if(e.keyCode == 68) { keyboard.D = true; }
        if (e.keyCode == 16) { keyboard.SHIFT = true; }
    });

    window.addEventListener('keyup', (e) => {
        if(e.keyCode == 39) { keyboard.RIGHT = false; }
        if(e.keyCode == 37) { keyboard.LEFT = false; }
        if(e.keyCode == 38) { keyboard.UP = false; }
        if(e.keyCode == 40) { keyboard.DOWN = false; }
        if(e.keyCode == 32) { keyboard.SPACE = false; }
        if(e.keyCode == 68) { keyboard.D = false; }
        if (e.keyCode == 16) { keyboard.SHIFT = false; }
    });
});


function drawStartScreen() {
    const startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
    startImage.onload = () => {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
        startButton.style.display = 'flex'; 
    };
}


function startGame() {
    window.allSounds = [];
    initLevel();
    startButton.style.display = 'none';
    endScreen.style.display = 'none';
    world = new World(canvas, keyboard);
    window.allSounds.forEach(sound => {
        sound.muted = window.isMuted;
    });
}


function playAgain() {
    initLevel();
    startButton.style.display = 'none';
    endScreen.style.display = 'none';
    world = new World(canvas, keyboard);
}


function fullScreenButton() {
    let fullScreenButton = document.getElementById('fullScreenButton');
    fullScreenButton.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            canvas.requestFullscreen();
        }
    });
}


function simulateKeydown(keyCode) {
    const event = new KeyboardEvent('keydown', { keyCode: keyCode });
    window.dispatchEvent(event);
}

function simulateKeyup(keyCode) {
    const event = new KeyboardEvent('keyup', { keyCode: keyCode });
    window.dispatchEvent(event);
}


window.allSounds = window.allSounds || [];
window.isMuted = window.isMuted || false;

function toggleAllSounds() {
    const volumeButton = document.getElementById('volumeButton').querySelector('i');
    window.isMuted = !window.isMuted;

    if (window.isMuted) {
        volumeButton.classList.remove('fa-volume-high');
        volumeButton.classList.add('fa-volume-xmark');
    } else {
        volumeButton.classList.remove('fa-volume-xmark');
        volumeButton.classList.add('fa-volume-high');
    }
    window.allSounds.forEach(sound => {
        sound.muted = window.isMuted;
    });
}