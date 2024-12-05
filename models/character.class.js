class Character extends MovableObject {
  height = 250;
  y = 80;
  speed = 10;

  isDashing = false;
  dashDistance = 300;
  dashDuration = 200;
  dashCooldown = 1000;
  lastDashTime = 0;

  offset = {
    top: 120,
    left: 40,
    right: 30,
    bottom: 30,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE = [
    " img/2_character_pepe/1_idle/idle/I-1.png",
    " img/2_character_pepe/1_idle/idle/I-2.png",
    " img/2_character_pepe/1_idle/idle/I-3.png",
    " img/2_character_pepe/1_idle/idle/I-4.png",
    " img/2_character_pepe/1_idle/idle/I-5.png",
    " img/2_character_pepe/1_idle/idle/I-6.png",
    " img/2_character_pepe/1_idle/idle/I-7.png",
    " img/2_character_pepe/1_idle/idle/I-8.png",
    " img/2_character_pepe/1_idle/idle/I-9.png",
    " img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  world;

  idleTime;
  walking_sound = new Audio("audio/walking.mp3");
  jumping_sound = new Audio("audio/jump.mp3");

  /**
   * Initializes a new instance of the character class.
   *
   * This constructor loads the initial images for different states of the character,
   * including walking, jumping, dead, hurt, and idle states. It also initializes
   * sound effects for walking and jumping, ensuring that they are stored globally
   * and pushed to the `allSounds` array if they are not already defined.
   * Finally, it applies gravity to the character and starts the animation loop.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);

    if (!window.walking_sound) {
      window.walking_sound = new Audio("audio/walking.mp3");
      window.allSounds.push(window.walking_sound);
    }

    if (!window.jumping_sound) {
      window.jumping_sound = new Audio("audio/jump.mp3");
      window.allSounds.push(window.jumping_sound);
    }

    this.walking_sound = window.walking_sound;
    this.jumping_sound = window.jumping_sound;

    this.applyGravity();
    this.animate();
  }

  /** Checks if the character is currently invulnerable. */
  isInvulnerable() {
    return this.isHurt();
  }

  /**
   * Applies damage to the character, reducing its energy.
   * This method decreases the character's energy by 20 if the character is not
   * currently invulnerable. If the energy drops to 0 or below, the game ends with a
   * 'lose' status. If the character is still alive, it updates the timestamp of the
   * last hit and updates the status bar to reflect the current energy level.
   */
  hit() {
    if (!this.isInvulnerable()) {
      this.energy -= 20;
      if (this.energy <= 0) {
        this.energy = 0;
        this.world.endGame("lose");
      } else {
        this.lastHit = new Date().getTime();
      }
      this.world.statusBar.setPercentage(this.energy);
    }
  }

  /**
   * Executes a dash movement for the character.
   * This method initiates a dash if the character is not already dashing and is allowed to dash.
   * It calculates the direction and total distance of the dash based on the character's current state.
   * The dash occurs over a specified duration, updating the character's position in small increments.
   * Once the dash completes, the dashing state is reset.
   */
  dash() {
    if (!this.isDashing && this.canDash()) {
      this.startDash();
    }
  }

  startDash() {
    this.isDashing = true;
    this.lastDashTime = Date.now();

    const dashDirection = this.otherDirection ? -1 : 1;
    const totalDashDistance = dashDirection * this.dashDistance;
    const dashStartTime = Date.now();
    const startX = this.x;

    this.executeDash(totalDashDistance, dashStartTime, startX);
  }

  executeDash(totalDashDistance, dashStartTime, startX) {
    const dashInterval = setInterval(() => {
      const progress = this.calculateDashProgress(dashStartTime);

      this.x = this.calculateNewPosition(startX, totalDashDistance, progress);
      this.constrainPosition();

      if (progress >= 1) {
        clearInterval(dashInterval);
        this.isDashing = false;
      }
    }, 1000 / 60);
  }

  calculateDashProgress(dashStartTime) {
    const elapsedTime = Date.now() - dashStartTime;
    return Math.min(elapsedTime / this.dashDuration, 1);
  }

  calculateNewPosition(startX, totalDashDistance, progress) {
    return startX + totalDashDistance * progress;
  }

  constrainPosition() {
    this.x = Math.max(0, Math.min(this.x, this.world.level.level_end_x));
  }

  /**
   * Checks if the character is allowed to dash based on the cooldown period.
   * This method compares the current time with the time of the last dash.
   * It returns `true` if the cooldown period has elapsed, allowing for a new dash,
   * and `false` otherwise.
   */
  canDash() {
    let currentTime = new Date().getTime();
    return currentTime - this.lastDashTime >= this.dashCooldown;
  }

  /**
   * Initiates the animation and movement process for the character.
   * This function sets up two intervals: one for handling the character's
   * movement and updating the camera position at a frame rate of 60 frames per
   * second, and another for updating the character's animation state every 50
   * milliseconds. The function also plays the idle animation initially.
   */
  animate() {
    setInterval(() => {
      this.handleMovement();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.updateAnimation();
    }, 50);

    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * Handles the character's movement based on keyboard input.
   * This function checks the state of various keyboard keys to determine
   * the character's movement. It pauses the walking sound, and if the
   * SHIFT key is pressed, it activates the dash method. If the RIGHT
   * or LEFT keys are pressed, it calls the respective methods to move
   * the character in that direction, provided movement is possible.
   * Additionally, if the SPACE key is pressed and the character is not
   * above ground and is not dashing, it triggers a jump action.
   */
  handleMovement() {
    this.walking_sound.pause();

    if (this.world.keyboard.SHIFT && !this.isDashing) {
      this.dash();
    } else if (this.world.keyboard.RIGHT) {
      this.moveRightIfPossible();
    } else if (this.world.keyboard.LEFT) {
      this.moveLeftIfPossible();
    }
    if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.isDashing) {
      this.jump();
      this.jumping_sound.play();
      this.resetIdleTime();
    }
  }

  /**
   * Moves the character to the right if movement conditions are met.
   * This function checks if the character's current position is less than
   * the level's end position and ensures that the character is not currently
   * dashing. If both conditions are satisfied, it moves the character to
   * the right, updates the direction, plays the walking sound, and resets
   * the idle time.
   */
  moveRightIfPossible() {
    if (this.x < this.world.level.level_end_x && !this.isDashing) {
      this.moveRight();
      this.otherDirection = false;
      this.walking_sound.play();
      this.resetIdleTime();
    }
  }

  /**
   * Moves the character to the left if movement conditions are met.
   * This function checks if the character's current position is less than
   * the level's end position and ensures that the character is not currently
   * dashing. If both conditions are satisfied, it moves the character to
   * the left, updates the direction, plays the walking sound, and resets
   * the idle time.
   */
  moveLeftIfPossible() {
    if (this.x > 0 && !this.isDashing) {
      this.moveLeft();
      this.otherDirection = true;
      this.walking_sound.play();
      this.resetIdleTime();
    }
  }

  /**
   * Updates the character's animation based on its current state.
   * This function checks the character's status to determine which
   * animation to play. It prioritizes the following states:
   * - If the character is dead, it plays the dead animation.
   * - If the character is hurt, it plays the hurt animation.
   * - If the character is above ground, it plays the jumping animation.
   * - If the character is moving left or right, it plays the walking animation.
   * - If none of these conditions are met, it starts the idle timer.
   */
  updateAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.startIdleTime();
    }
  }

  /**
   * Starts a timer to play the idle animation after a period of inactivity.
   * This method sets a timeout for 3000 milliseconds (3 seconds) to trigger
   * the idle animation.
   */
  startIdleTime() {
    this.idleTime = setTimeout(() => {
      this.playAnimation(this.IMAGES_IDLE);
    }, 3000);
  }

  /**
   * Resets the idle timer, preventing the idle animation from playing.
   * This method clears the current idle timeout and restarts the idle timer.
   */
  resetIdleTime() {
    clearTimeout(this.idleTime);
    this.startIdleTime();
  }

  /**
   * Initiates a jump for the character.
   * This method sets the vertical speed (`speedY`) of the character to a
   * predefined value, allowing the character to jump.
   */
  jump() {
    this.speedY = 30;
  }
}
