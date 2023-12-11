class Coin extends DrawableObject{
    height = 100;
    width = 100;
    coinEnergy = 0;
    iD;

    
    /**
     * creates a coin object
     */
    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.iD = 100 + Math.random() * 700;
        this.x = 200 + Math.random() * (705*3);
        this.y = Math.random() * 200;
    }


    /**
     * deletes the collectable coin object 
     * @param {Object} level current level object
     * @param {integer} coinId the id of the coin object that will be deleted
     */
    deleteCoin(level, coinId){
        for (let index = 0; index < level.coins.length; index++) {
            const coin = level.coins[index];
            if(coin.iD == coinId){
                level.coins.splice(index, 1);
            }
        }
    }

}