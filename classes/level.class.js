class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    startscreenObjects;

    level_end_x = 2800;

    /**
     * creates a level object
     * @param {Chicken, Endboss, SmallChicken} enemies enemy objects
     * @param {Cloud} clouds enemy objects
     * @param {BackgroundObject} backgroundObjects background objects
     * @param {Coin} coins coin objects
     * @param {Bottle} bottles bottle objects
     * @param {StartscreenObject} startscreenObjects startscreen objects
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, startscreenObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.startscreenObjects = startscreenObjects;
    }
}