class ThrowableObject extends MoveableObject{
    IMAGES_TRHOW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]
    hitable = true;


    /**
     * creates a throwable object
     * @param {integer} x horizontal coordinate for placing the image
     * @param {integer} y vertical coordinate for placing the image
     * @param {Boolean} otherDirection give the direction in which the character is facing
     */
    constructor(x, y, otherDirection){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
        this.loadImages(this.IMAGES_TRHOW); 
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.throw(otherDirection, x);
        this.animate();
    }


    /**
     * character throws a throwable object
     * @param {*} otherDirection give the direction in which the character is facing
     * @param {*} x horizontal coordinate for calculating the position of the image
     */
    throw(otherDirection, x){
        this.speedY = 30;
        this.applyGravity(); 
        if(otherDirection){
            this.x = x -150;
            setInterval(() => {
                this.x -= 10;
            }, 25);
        }
        else{
            setInterval(() => {
                this.x += 10;
            }, 25);
        }
    }   

    
    /**
    * animate the movement of a throwable object
    */
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_TRHOW);
        }, 50);
    }


    /**
    * animate the splash sequenz of a throwable object
    */
    animateSplash(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50);
    }
}