class Level {
    enemies;
    clouds;
    endboss;
    backgroundObjects;
    level_end_x = 2250;
    salsaBottles;
    coins;

    constructor(enemies, clouds, backgroundObjects, salsaBottles,coins,endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.endboss = endboss;
        this.backgroundObjects = backgroundObjects;
        this.salsaBottles = salsaBottles;
        this.coins = coins;
    }
}