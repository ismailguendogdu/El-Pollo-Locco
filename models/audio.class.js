export default class AudioManager {
  constructor() {
    this.walking_sound = new Audio("audio/walking.mp3");
    this.jumping_sound = new Audio("audio/jump.mp3");
  }

  muteAllSounds(isMuted) {
    this.walking_sound.muted = isMuted;
    this.jumping_sound.muted = isMuted;
  }
}
