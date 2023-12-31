class Character extends MoveableObject {
    height = 280;
    y = 0;
    speed = 10;
    energy = 100;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'       
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    world;
    walking_sound = new Audio('audio/running.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    lastHit = 0;
    lastAction = new Date().getTime();


    /**
     * creates a character object
     */
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravity();
        this.animate();
    }


    /**
     * animate the movement and animation of a character object
     */
    animate(){
        this.controlMovement();
        this.controlAnimations();
    }


    /**
     * controls the movement of the character
     */
    controlMovement(){
        setInterval(() => {
            this.walking_sound.pause();
            if(this.moveRightCondition()){
                this.moveRightSequence();
            }
            if(this.moveLeftCondition()){
                this.moveLeftSequence();
            }
            if(this.jumpCondition()){
                this.jumpSequence();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }


    /**
     * checks the condition to walk left
     * @returns bool
     */
    moveLeftCondition(){
        return this.world.keyboard.LEFT && this.x > 0 && !(this.world.level == startScreen)
    }


    /**
     * starts the move left movement of the character
     */
    moveLeftSequence(){
        this.moveLeft();
        this.otherDirection = true;
        if(!(background_sound.muted)){
            this.walking_sound.play();
        }
        this.getLastAction();
    }


    /**
     * checks the condition to walk right
     * @returns bool
     */
    moveRightCondition(){
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x
                && !(this.world.level == startScreen)
    }


    /**
     * starts the move right movement of the character
     */
    moveRightSequence(){
        this.moveRight();
        this.otherDirection = false;
        if(!(background_sound.muted)){
            this.walking_sound.play();
        }
        this.getLastAction();
    }


    /**
     * checks the condition to jump
     * @returns bool
     */
    jumpCondition(){
        return this.world.keyboard.SPACE && !this.isAboveGround() 
                && !(this.world.level == startScreen)
    }


    /**
     * starts the jump movement of the character
     */
    jumpSequence(){
        this.jump();
        if(!(background_sound.muted)){
            this.jump_sound.play();
        }
        this.getLastAction();
    }


    /**
     * controls the animation of the character
     */
    controlAnimations(){
        setInterval(() => {
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);} 
            else if(this.isHurt()){
                this.playAnimation(this.IMAGES_HURT);}
            else if(this.isAboveGround()){
                this.playAnimation(this.IMAGES_JUMPING);}
            else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                this.playAnimation(this.IMAGES_WALKING);}
            else if(this.activateLongIdle()){
                this.playAnimation(this.IMAGES_LONGIDLE);}
            else{
                this.playAnimation(this.IMAGES_IDLE);}
        }, 100);
    }


    /**
     * calculates the current energy the character if the character is hit
     * by an enemy
     */
    hit(){
        this.energy -= 20;
        if(this.energy < 0){
            this.energy = 0;
        }
        else{
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * returns a bool depending on the current character energy
     * @returns bool
     */
    isDead(){
        return this.energy == 0;
    }


    /**
     * returns a bool depending on the time difference beetween the "lastHit"  
     * and the timepasssed since this function was called
     * @returns bool
     */
    characterHitCooldown(){
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed > 1.5;
    }


    /**
     * returns a bool depending on the time difference beetween the "lastHit"  
     * and the timepasssed since this function was called
     * @returns bool
     */
    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000; 
        return timepassed < 1.5;
    }


    /**
     * returns a bool depending on the time difference beetween the "lastAction"  
     * and the timepasssed since this function was called
     * @returns bool
     */
    activateLongIdle(){
        let timepassed = new Date().getTime() - this.lastAction; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed > 2;
    }


    /**
     * saves the last time a relevant button is pressed which triggered a character movement
     */
    getLastAction(){
        this.lastAction = new Date().getTime();
    }
}