let canvas;
let world;
let keyboard = new Keyboard();
let startButton;
let ctx;
let playAgainButton;
let endScreen;
let gameMusic;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    startButton = document.getElementById('startButton');
    playAgainButton = document.getElementById('playAgainButton');
    endScreen = document.getElementById('endScreen');
    gameMusic = document.getElementById('gameMusic');

    drawStartScreen();

    startButton.style.display = 'block';
    startButton.addEventListener('click', startGame);
    playAgainButton.addEventListener('click', playAgain);
    fullScreenButton();
}

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

    gameMusic.play();
    initLevel();
    startButton.style.display = 'none';
    endScreen.style.display = 'none';
    world = new World(canvas, keyboard);

    window.allSounds.forEach(sound => {
        sound.muted = window.isMuted;
    });
}


function playAgain() {

    gameMusic.currentTime = 0;
    gameMusic.play();

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
    gameMusic.muted = window.isMuted;
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

    if (e.keyCode == 16) { 
        keyboard.SHIFT = true;
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

    if (e.keyCode == 16) { 
        keyboard.SHIFT = false;
    }
});



document.addEventListener('DOMContentLoaded', () => {
    
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const upBtn = document.getElementById('upBtn');
    const attackBtn = document.getElementById('attackBtn');

    
    leftBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        keyboard.LEFT = true; 
    }, { passive: false });

    rightBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true; 
    }, { passive: false });

    attackBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true; 
    }, { passive: false });

    upBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true; 
    }, { passive: false });

    
    leftBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false; 
    }, { passive: false });

    rightBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });

    attackBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false; 
    }, { passive: false });

    upBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false; 
    }, { passive: false });

    
    const mobileControls = document.querySelector('.mobileControls');
    mobileControls.addEventListener('touchmove', (e) => {
        e.preventDefault(); 
    }, { passive: false });

    leftBtn.addEventListener('mousedown', () => { keyboard.LEFT = true; });
    rightBtn.addEventListener('mousedown', () => { keyboard.RIGHT = true; });
    attackBtn.addEventListener('mousedown', () => { keyboard.D = true; });
    upBtn.addEventListener('mousedown', () => { keyboard.SPACE = true; });

    leftBtn.addEventListener('mouseup', () => { keyboard.LEFT = false; });
    rightBtn.addEventListener('mouseup', () => { keyboard.RIGHT = false; });
    attackBtn.addEventListener('mouseup', () => { keyboard.D = false; });
    upBtn.addEventListener('mouseup', () => { keyboard.SPACE = false; });
});