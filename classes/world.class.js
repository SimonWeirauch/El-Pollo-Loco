class World{
    HEALTHBAR_IMG = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]
    COINBAR_IMG = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]
    BOTTLEBAR_IMG = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]
    ENDBOSSBAR_IMG = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ]
    character = new Character();
    level;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    bottleCount = 0;
    throwableObjects = [];
    gameover = false;
    isEndbossDead = false;
    
    throw_sound = new Audio('audio/throw2.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    characterHit_sound = new Audio('audio/characterHit.mp3');
    brokenBottle_sound = new Audio('audio/brokenBottle.mp3');
    enemyHit_sound = new Audio('audio/enemyHit.mp3');
    collectBottle_sound = new Audio('audio/collectBottle.mp3');

    lastThrow = new Date().getTime();
    lastEndbossHit =  new Date().getTime();
    
    healthbar = new Statusbar(this.HEALTHBAR_IMG, 100, 0, 40);
    coinbar = new Statusbar(this.COINBAR_IMG, 0, 50, 40);
    bottlebar = new Statusbar(this.BOTTLEBAR_IMG, 0, 100, 40);
    enbossHealthbar = new Statusbar(this.ENDBOSSBAR_IMG, 100, 0, 500);


    /**
     * 
     * @param {HTML-ELEMENT} canvas canvas html element
     * @param {Object} keyboard keyboard object
     * @param {Object} level current level object
     */
    constructor(canvas, keyboard, level){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.draw();
        this.run();
    }


    /**
     * sets the character world property to this world instance
     */
    setWorld(){
        this.character.world = this;
    }


    /**
     * starts the game loop
     */
    run(){
        setInterval(() => {
            if(this.gameOver()){
                this.gameover = true;
            }
            else{
                this.checkEnemyCollisions();
                this.checkObjectCollisions();
                this.checkThrowObjects();
            }
        }, 1000/60);
    }


    /**
     * checks if an enemy is hit by the character or 
     * the character is hit by an enemy
     */
    checkEnemyCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.isCharacterHit(enemy)){
                this.characterGotHit();
            };
            if(this.isEnemyHit(enemy)){
                this.enemyGotHit(enemy);
            }
        })
    }


    /**
     * returns a bool if the character is hit by an enemy
     * @param {object} enemy current enemy object
     * @returns bool
     */
    isCharacterHit(enemy){
        return this.character.isColliding(enemy) && !this.character.isAboveGround() 
        && !(enemy.isDead) && this.character.characterHitCooldown()
    }

    /**
     * calls the various function to display that the character got hit
     */
    characterGotHit(){
        if(!(background_sound.muted)){
            this.characterHit_sound.play();
        }
        this.character.hit();
        this.character.blowback();
        this.healthbar.setPercentage(this.character.energy, this.HEALTHBAR_IMG)
    }


    /**
     * returns a bool if an enemy is hit by the character
     * @param {object} enemy current enemy object
     * @returns bool
     */
    isEnemyHit(enemy){
        return this.character.isColliding(enemy) && this.character.isAboveGround() && !(enemy.isDead)
    }


    /**
     * calls the various function to display that an enemy got hit
     * @param {object} enemy current enemy object
     */
    enemyGotHit(enemy){
        enemy.hitChicken(this.level, enemy.iD);
        if(!(background_sound.muted)){
            this.enemyHit_sound.play();
        }
        this.character.smallJump();
    }


    /**
     * calls the various function to check if a collision between two
     * objects occured
     */
    checkObjectCollisions(){
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkThrowObjectsCollision();
    }


    /**
     * check if a collision between the character and a collectable coin occured
     */
    checkCoinCollision(){
        this.level.coins.forEach(coin => {
            if(this.character.isColliding(coin)){
                if(!(background_sound.muted)){
                    this.coin_sound.play();
                }
                this.coinbar.fillCoinbar();
                this.coinbar.setPercentage(this.coinbar.coinEnergy, this.COINBAR_IMG);
                setTimeout(() => {
                    coin.deleteCoin(this.level, coin.iD);
                }, 30); 
            }
        });
    }


    /**
     * check if a collision between the character and a collectable bottle occured
     */
    checkBottleCollision(){
        this.level.bottles.forEach(bottle => {
            if(this.character.isColliding(bottle)){
                this.bottlebar.fillBottlebar();
                this.bottleCount++;
                if(!(background_sound.muted)){
                    this.collectBottle_sound.play();
                }
                this.bottlebar.setPercentage(this.bottlebar.bottleEnergy, this.BOTTLEBAR_IMG);
                bottle.deleteBottle(this.level, bottle.iD);
            }
        });
    }


    /**
     * check if a collision between an enemy and a throwable object occured
     */
    checkThrowObjectsCollision(){
        this.level.enemies.forEach(enemy => {
            this.throwableObjects.forEach(bottleThrow => {
                if(bottleThrow.isColliding(enemy) && !(enemy.isDead)){
                    this.chickenGotHitWithBottle(enemy, bottleThrow);
                    this.smallchickenGotHitWithBottle(enemy, bottleThrow);
                    this.endbossGotHitWithBottle(enemy, bottleThrow);
                }
            });
        });
    }


    /**
     * calls the various function to display that a chicken
     * got hit with a bottle
     * @param {object} enemy current enemy object
     * @param {object} bottleThrow current throwablae object
     */
    chickenGotHitWithBottle(enemy, bottleThrow){
        if(enemy instanceof Chicken){
            enemy.hitChicken(this.level, enemy.iD);
            bottleThrow.animateSplash();
            if(!(background_sound.muted)){
                this.brokenBottle_sound.play();
            }
        }
    }

    /**
     * calls the various function to display that a small chicken
     * got hit with a bottle
     * @param {object} enemy current enemy object
     * @param {object} bottleThrow current throwablae object
     */
    smallchickenGotHitWithBottle(enemy, bottleThrow){
        if(enemy instanceof SmallChicken){
            enemy.hitChicken(this.level, enemy.iD);
            bottleThrow.animateSplash();
            if(!(background_sound.muted)){
                this.brokenBottle_sound.play();
            }
        }
    }


    /**
     * calls the various function to display that an endboss
     * got hit with a bottle
     * @param {object} enemy current enemy object
     * @param {object} bottleThrow current throwablae object
     */
    endbossGotHitWithBottle(enemy, bottleThrow){
        if(enemy instanceof Endboss && this.endbossHitCooldown()){
            console.log('hit Endboss')
            this.enbossHealthbar.emptyEndbossHealthbar();
            this.enbossHealthbar.setPercentage(this.enbossHealthbar.endbossEnergy, this.ENDBOSSBAR_IMG);
            this.bottleBehaviour(bottleThrow);
            this.endbossBehaviour(enemy);
        }
    }


    /**
     * starts the splash animation for the bottle when hit the endboss
     * @param {object} bottleThrow current throwablae object
     */
    bottleBehaviour(bottleThrow){
        bottleThrow.animateSplash();
        if(!(background_sound.muted)){
            this.brokenBottle_sound.play();
        }
    }


    /**
     * starts the sequence if the endboss got hit by a throwable object
     * @param {object} enemy current enemy object
     */
    endbossBehaviour(enemy){
        this.getLastEndbossHit();
        enemy.isHurt();
        if(this.enbossHealthbar.endbossEnergy <= 0){
            enemy.isDead = true;
            enemy.deathAnimation();
            setTimeout(() => {
                enemy.deleteEndboss(this.level, enemy.iD);
                this.isEndbossDead = true;
            }, 2000);
            setTimeout(() => {
                this.clearAllIntervalls();
                loadNextLevel(this.level);
            }, 4000);
        }
    }


    /**
     * checks if the character is able to throw a throwable object
     */
    checkThrowObjects(){
        if(this.keyboard.D && this.bottleCount > 0){
            let bottleThrow = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            if(this.throwCooldown()){
                this.throwableObjects.push(bottleThrow);
                this.character.getLastAction();
                this.getLastThrow();
                if(!(background_sound.muted)){this.throw_sound.play();}
                this.bottleCount--;
                this.bottlebar.emptyBottlebar();
                this.bottlebar.setPercentage(this.bottlebar.bottleEnergy, this.BOTTLEBAR_IMG);
            }
        }
    }


    /**
     * applies a cooldown to the throw ability of the character
     * @returns bool
     */
    throwCooldown(){
        let timepassed = new Date().getTime() - this.lastThrow; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed > 1.5;
    }


    /**
     * saves the time when the throw ability was previously used
     */
    getLastThrow(){
        this.lastThrow = new Date().getTime();
    }


    /**
     * applies a cooldown on the ability to hit the endboss
     * @returns bool
     */
    endbossHitCooldown(){
        let timepassed = new Date().getTime() - this.lastEndbossHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed > 1.5;
    }


    /**
     * saves the time when the endboss was previously hit 
     */
    getLastEndbossHit(){
        this.lastEndbossHit = new Date().getTime();
    }
    

    /**
     * draws the various objects onto the canvas
     */
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addAlllevelObjects();
        this.addStartscreenObjects();
        this.addGameOverObjects();
        self = this
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    /**
     * adds the various level objects onto the canvas        
     */
    addAlllevelObjects(){
        if(!(this.level == startScreen)){
            
            //space for not fixed objects
            if(!(this.gameover)){this.ctx.translate(this.camera_x, 0);} //verschiebt die Kamera nach rechts
            this.drawAllLevelObjects();
            if(!(this.gameover)){this.ctx.translate(-this.camera_x, 0);}//Back
            
            //Space for fixed objects
            this.addAllFixedObjects();
            this.addVictoryScreen();

            //space for objects that are focused by the camera
            this.ctx.translate(this.camera_x, 0); //Forwards
            this.addCharacter();
            this.ctx.translate(-this.camera_x, 0); //verschiebt die Kamera nach links
        }
    }


    /**
     * draws the victoryscreen on the level
     */
    addVictoryScreen(){
        if(this.isEndbossDead){
            this.addObjectsToMap(this.level.victoryScreen);
        }
    }


    /**
     * draws the character on the level
     */
    addCharacter(){
        if(!(this.level == startScreen) && !(this.gameover)){
            this.addToMap(this.character);
        }
    }


    /**
     * draws the objects on the level
     */
    drawAllLevelObjects(){
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.startscreenObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.showCurrentLevel(this.level);
    }


    /**
     * draws the objects for that are fixed regardless of the camera position
     */
    addAllFixedObjects(){
        if(!(this.level == startScreen)){
            this.addToMap(this.healthbar);
            this.addToMap(this.coinbar);
            this.addToMap(this.bottlebar);
            if(this.character.x > (this.level.level_end_x - 750)){
                this.addToMap(this.enbossHealthbar);
            }
        }
    }


    /**
     * draws the objects for the startscreen
     */
    addStartscreenObjects(){
        if(this.level == startScreen){
            this.addObjectsToMap(this.level.startscreenObjects);
            this.addTextObject("Left =", 40, 400);
            this.addTextObject("Right =", 200, 400);
            this.addTextObject("Jump =", 380, 400);
            this.addTextObject("Throw = D", 570, 400);
            this.addTextObject("M =", 440, 40);
            this.addTextObject("F =", 590, 40);
        }
    }


    /**
     * draws the objects for the gameover screen
     */
    addGameOverObjects(){
        if(this.gameover){
            this.addObjectsToMap(this.level.gameoverScreenObjects);
        }
    }


    /**
     * displays a text on the canvas
     * @param {string} text text that will be displayed
     * @param {integer} x horizontal coordinate for placing the image
     * @param {integer} y vertical coordinate for placing the image
     */
    addTextObject(text, x, y){
        this.ctx.font = "30px ZABRAS";
        this.ctx.fillText(text, x, y);
    }


    /**
     * adds the string on to the shield at the beginning of each level
     * @param {object} level current level object
     */
    showCurrentLevel(level){
        if(level == level1){
            this.addTextObject("Level 1", 250, 230);
        }
        else if(level == level2){
            this.addTextObject("Level 2", 250, 230);
        }
    }


    /**
     * adds the different objects of the level to the canvas
     * @param {objects} objects 
     */
    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * adds a moveable object to the canvas depending on it´s facing
     * @param {object} mo an instance of a moveable object
     */
    addToMap(mo){
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * flips the facing of the moveable object
     * @param {object} mo an instance of a moveable object
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * flips the  facing of the moveable object back
     * @param {object} mo an instance of a moveable object 
     */
    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     *  returns a bool if the energy of the character hits 0 or less
     * @returns bool
     */
    gameOver(){
        return this.character.energy <= 0;
    }


    /**
     * clears all active intervalls
     */
    clearAllIntervalls(){
        for(let i = 1; i < 999; i++){
            window.clearInterval(i);
        }
    }
}