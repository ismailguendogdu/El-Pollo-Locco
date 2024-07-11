class Level {
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2250;
    salsaBottles;
    coins;

    constructor(enemies, clouds, backgroundObjects, salsaBottles,coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.salsaBottles = salsaBottles;
        this.coins = coins;
    }
}