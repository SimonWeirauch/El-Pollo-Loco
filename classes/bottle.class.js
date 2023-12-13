class Bottle extends DrawableObject{
    height = 100;
    width = 100;
    y = 290;
    iD;

    /**
     * creates a bottle object
     */
    constructor(){
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * (705*3);
        this.iD = 100 + Math.random() * 700;
    }


    /**
     * deletes the collectable bottle object 
     * @param {Object} level current level object
     * @param {integer} bottleId the id of the collectable bottle that will be deleted
     */
    deleteBottle(level, bottleId){
        for (let index = 0; index < level.bottles.length; index++) {
            const bottle = level.bottles[index];
            if(bottle.iD == bottleId){
                level.bottles.splice(index, 1);
            }
        }
    }
}