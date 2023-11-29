class Bottle extends DrawableObject{
    height = 100;
    width = 100;
    y = 290;
    iD;

    constructor(){
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * (705*3);
        this.iD = 100 + Math.random() * 700;
    }


    deleteBottle(level, bottleId){
        for (let index = 0; index < level.bottles.length; index++) {
            const bottle = level.bottles[index];
            if(bottle.iD == bottleId){
                level.bottles.splice(index, 1);
            }
        }
    }
}