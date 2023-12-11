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
    

    /**
     * creates a small chicken object
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.iD = 100 + Math.random() * 700;
        this.x = 200 + Math.random() * (705*3);
        this.speed = 0.9 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * animate the movement of a small chicken object
     */
    animate(){
        this.smallChickenInterval1 = setInterval( () => {
            this.moveLeft();
        }, 1000/60);
        this.smallChickenInterval2 = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    
    /**
     * sets the status of the "isDead" variable
     * @returns bool depending on the chickens death status
     */
    chickenDies(){
        if(this.isDead == false){
            this.isDead = true;
            return false
        }
        else{
            return true;
        }
    }


    /**
     * plays the death animation for the small chicken object
     */
    playChickenDeathAnimation(){
        this.img.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
        this.smallChickenIntervalIDs.push(this.smallChickenInterval1);
        this.smallChickenIntervalIDs.push(this.smallChickenInterval2);
        this.smallChickenIntervalIDs.forEach(clearInterval);   
    }


    /**
     * deletes the small chicken object
     * @param {Object} level current level object
     * @param {integer} ChickenId the id of the small chicken object that will be deleted
     */
    deleteChicken(level, ChickenId){
        for (let index = 0; index < level.enemies.length; index++) {
            const enemy = level.enemies[index];
            if(enemy.iD == ChickenId){
                level.enemies.splice(index, 1);
            }
        }
    }


    /**
     * applied when the character hits a small chicken object
     * @param {Object} level current level object
     * @param {integer} ChickenId the id of the small chicken object that is hit
     */
    hitChicken(level, ChickenId){
        this.chickenDies();
        this.playChickenDeathAnimation();
        setTimeout(() => {
            this.deleteChicken(level, ChickenId)
        }, 500);
    }
}