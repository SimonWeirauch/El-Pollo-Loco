class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    startscreenObjects;

    level_end_x = 2800;

    constructor(enemies, clouds, backgroundObjects, coins, bottles, startscreenObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.startscreenObjects = startscreenObjects;
    }
}