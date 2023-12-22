class Endboss extends MoveableObject{
    height = 400;
    width = 250;
    y = 0
    iD;
    isDead = false;
    lastHit = 0
    endbossInterval1;
    endbossInterval2;
    endbossInterval3;
    endbossInterval4;
    endbossIntervalIDs = [];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ]
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]
    IMAGES_WALK=[
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]


    /**
     * creates an endboss object
     */
    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALK);
        this.iD = 100 + Math.random() * 700;
        this.speed = 1 + Math.random() * 0.5;
        this.x = 2500;
        this.animate();
    }

    
    /**
     * animate the alert status of an endboss object
     */
    animate(){
        this.endbossInterval3 = setInterval(() => {
            this.moveLeft();
        }, 1000/60);
        this.endbossInterval4 = setInterval(() => {
            this.playAnimation(this.IMAGES_WALK);
        }, 200);
    }


    /**
     * animate the "isHurt" status of an endboss object
     */
    isHurt(){
        this.detectLastHit();
        this.clearEndbossIntervalls();
        this.endbossInterval2 = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
            if(this.movementCooldown()){
                this.clearEndbossIntervalls()
                this.animate();
            }
        }, 200);
    }


    /**
     * animate the death animation of an endboss object
     */
    deathAnimation(){
        this.clearEndbossIntervalls();
        setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);
    }


    /**
     * clears the previous intervalls of the movement animation from the endboss
     */
    clearEndbossIntervalls(){
        this.endbossIntervalIDs.push(this.endbossInterval1);
        this.endbossIntervalIDs.push(this.endbossInterval2);
        this.endbossIntervalIDs.push(this.endbossInterval3);
        this.endbossIntervalIDs.push(this.endbossInterval4);
        this.endbossIntervalIDs.forEach(clearInterval);
    }

    
    /**
     * deletes the endboss object
     * @param {Object} level current level object
     * @param {integer} endbossId the id of the endboss object that will be deleted
     */
    deleteEndboss(level, endbossId){
        for (let index = 0; index < level.enemies.length; index++) {
            const enemy = level.enemies[index];
            if(enemy.iD == endbossId){
                level.enemies.splice(index, 1);
            }
        }
    }


    /**
     * saves the last time the endboss object got hit
     */
    detectLastHit(){
        this.lastHit = new Date().getTime();
    }


     /**
     * returns a bool depending on the time difference beetween the "lastHit"  
     * and the timepasssed since this function was called
     * @returns bool
     */
    movementCooldown(){
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed > 0.5;
    }
}