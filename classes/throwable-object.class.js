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

    
    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_TRHOW);
        }, 50);
    }


    animateSplash(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 50);
    }
}