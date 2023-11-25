class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    startscreenObjects;

    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, startscreenObjects, textObjects ){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.startscreenObjects = startscreenObjects;
    }
}