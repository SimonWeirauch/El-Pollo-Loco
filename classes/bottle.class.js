class Bottle extends DrawableObject{
    height = 100;
    width = 100;
    y = 290;

    constructor(){
        super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random() * (705*3);
    }
}