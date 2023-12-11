class Endboss extends MoveableObject{
    height = 400;
    width = 250;
    y = 0
    iD;
    isDead = false;
    endbossInterval1;
    endbossInterval2;
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


    /**
     * creates an endboss object
     */
    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.iD = 100 + Math.random() * 700;
        this.x = 2500;
        this.animate();
    }

    
    /**
     * animate the alert status of an endboss object
     */
    animate(){
        this.endbossInterval1 = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 200);
    }


    /**
     * animate the "isHurt" status of an endboss object
     */
    isHurt(){
        this.clearEndbossIntervalls();
        this.endbossInterval2 = setInterval(() => {
            this.playAnimation(this.IMAGES_HURT);
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
}