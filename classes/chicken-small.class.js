class SmallChicken extends MoveableObject{
    height = 70;
    width = 70;
    y = 310;
    smallChickenInterval1;
    smallChickenInterval2;
    smallChickenIntervalIDs = [];
    iD;
    isDead = false;
    
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    
    
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        
        this.iD = 100 + Math.random() * 700;

        this.x = 200 + Math.random() * (705*3); //spawning point on map
        this.speed = 0.9 + Math.random() * 0.5;

        this.animate();
    }


    animate(){
        this.smallChickenInterval1 = setInterval( () => {
            this.moveLeft();
        }, 1000/60);

        
        this.smallChickenInterval2 = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    
    chickenDies(){
        if(this.isDead == false){
            this.isDead = true;
            return false
        }
        else{
            return true;
        }
    }


    playChickenDeathAnimation(){
        this.img.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        this.smallChickenIntervalIDs.push(this.smallChickenInterval1);
        this.smallChickenIntervalIDs.push(this.smallChickenInterval2);
        this.smallChickenIntervalIDs.forEach(clearInterval);
       
    }


    deleteChicken(level, ChickenId){
        for (let index = 0; index < level.enemies.length; index++) {
            const enemy = level.enemies[index];
            if(enemy.iD == ChickenId){
                level.enemies.splice(index, 1);
            }
        }
    }


    hitChicken(level, id){
        this.chickenDies();
        this.playChickenDeathAnimation();
        setTimeout(() => {
            this.deleteChicken(level, id)
        }, 500);
    }
}