let canvas;
let world;
let keyboard = new Keyboard();
let startButton;
let ctx;
let playAgainButton;
let endScreen;
let gameMusic;


/**
 * Initializes the game by setting up the user interface and required elements.
 * 
 * This function retrieves the canvas element and its 2D context, 
 * as well as the buttons for starting the game and playing again. 
 * It displays the start screen and adds event listeners for the buttons.
 * Additionally, it loads the game music.
 */
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

/**
 * Draws the start screen of the game.
 * 
 * This function creates a new image, sets its source to the start screen image,
 * and draws it on the canvas when the image has fully loaded. 
 * It also sets the display style of the start button to 'flex' to make it visible.
 */

function drawStartScreen() {
    const startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_2.png';
    startImage.onload = () => {
        ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
        startButton.style.display = 'flex'; 
    };
}

/**
 * Starts the game by initializing the game level and setting up the environment.
 * 
 * This function plays the background music, initializes the game level,
 * and handles the visibility of the start button and end screen. 
 * It also creates a new game world and manages the sound settings based on the mute status.
 */

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

/**
 * Restarts the game by resetting the game state and playing the background music.
 * 
 * This function sets the current time of the game music to the beginning and plays it.
 * It reinitializes the game level, hides the start button and end screen,
 * and creates a new game world.
 */

function playAgain() {

    gameMusic.currentTime = 0;
    gameMusic.play();

    initLevel();
    startButton.style.display = 'none';
    endScreen.style.display = 'none';
    world = new World(canvas, keyboard);
}

/**
 * Sets up the functionality for the fullscreen button.
 * 
 * This function retrieves the fullscreen button element and adds an event listener
 * that toggles fullscreen mode for the canvas. If the document is currently in fullscreen,
 * it exits fullscreen; otherwise, it requests fullscreen for the canvas element.
 */

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

/**
 * Toggles the sound settings for the game, muting or unmuting all sounds.
 * 
 * This function retrieves the volume button icon and switches the mute state 
 * of the game. It updates the icon class based on whether the sounds are muted 
 * or unmuted. The mute state is applied to all sounds in the game, including 
 * the background music.
 */

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

/**
 * Handles keydown events to update the keyboard state for game controls.
 * This event listener updates the `keyboard` object based on the key pressed.
 * It sets the corresponding properties to `true` when specific keys are pressed.
 */

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

/**
 * Handles keyup events to update the keyboard state for game controls.
 * This event listener updates the `keyboard` object based on the key released.
 * It sets the corresponding properties to `false` when specific keys are released.
 */

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

/**
 * Initializes mobile control buttons and sets up event listeners for touch and mouse interactions.
 * This function is executed when the DOM content is fully loaded. It retrieves the control buttons 
 * and adds event listeners for touch and mouse events to update the `keyboard` object based on user input.
 * The following controls are managed:
 * - Left button (sets `keyboard.LEFT`)
 * - Right button (sets `keyboard.RIGHT`)
 * - Attack button (sets `keyboard.D`)
 * - Up button (sets `keyboard.SPACE`)
 * 
 * It also prevents default touch events for better responsiveness and manages touch movements to avoid 
 * unwanted scrolling.
 */


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