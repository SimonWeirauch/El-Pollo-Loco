class Chicken extends MoveableObject{
    height = 90;
    width = 90;
    y = 290;
    chickenInterval1;
    chickenInterval2;
    chickenIntervalIDs = [];
    iD;
    isDead = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    
    
    /**
     * creates a chicken object
     */
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.iD = 100 + Math.random() * 700;
        this.x = 200 + Math.random() * (705*3);
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    /**
     * animate the movement of a chicken object
     */
    animate(){
        this.chickenInterval1 = setInterval( () => {
            this.moveLeft();
        }, 1000/60);
        this.chickenInterval2 = setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    
     /**
     * sets the status of the "isDead" variable
     * @returns bool depending on the death status of the chicken object
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
     * plays the death animation for the chicken object
     */
    playChickenDeathAnimation(){
        this.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
        this.chickenIntervalIDs.push(this.chickenInterval1);
        this.chickenIntervalIDs.push(this.chickenInterval2);
        this.chickenIntervalIDs.forEach(clearInterval);
    }


    /**
     * deletes the chicken object
     * @param {Object} level current level object
     * @param {integer} ChickenId the id of the chicken object that will be deleted
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
     * applied when the character hits a chicken object
     * @param {Object} level current level object
     * @param {integer} ChickenId the id of the chicken object that is hit
     */
    hitChicken(level, ChickenId){
        this.chickenDies();
        this.playChickenDeathAnimation();
        setTimeout(() => {
            this.deleteChicken(level, ChickenId)
        }, 500);
    }
}