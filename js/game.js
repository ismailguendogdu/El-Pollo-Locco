let canvas;
let world;
let keyboard = new Keyboard();
let startButton;
let ctx;
let playAgainButton;
let endScreen;

function init() {
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
    
    initLevel();
    startButton.style.display = 'none';
    endScreen.style.display = 'none';
    world = new World(canvas, keyboard);
    
}

// function drawEndScreen() {
//     endScreen.style.display = 'none';
// }



function playAgain() {

    initLevel();
    startButton.style.display = 'none';
    endScreen.style.display = 'none';
    world = new World(canvas, keyboard);
    // console.log("Play again clicked"); 
    // endScreen.style.display = 'none'; 
    // startButton.style.display = 'none';
    // world = null; 
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // startGame();
    // console.log("Game restarted");
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


const walking_sound = new Audio('audio/walking.mp3');
const jumping_sound = new Audio('audio/jump.mp3');

const allSounds = [walking_sound, jumping_sound];

let isMuted = false;


function toggleAllSounds() {
    const volumeButton = document.getElementById('volumeButton').querySelector('i');
    isMuted = !isMuted;

    if (isMuted) {
        volumeButton.classList.remove('fa-volume-high');
        volumeButton.classList.add('fa-volume-xmark');
    } else {
        volumeButton.classList.remove('fa-volume-xmark');
        volumeButton.classList.add('fa-volume-high');
    }
    allSounds.forEach(sound => {
        sound.muted = isMuted;
    });
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