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
    
    lastThrow = new Date().getTime();
    lastEndbossHit =  new Date().getTime();
    
    healthbar = new Statusbar(this.HEALTHBAR_IMG, 100, 0, 40);
    coinbar = new Statusbar(this.COINBAR_IMG, 0, 50, 40);
    bottlebar = new Statusbar(this.BOTTLEBAR_IMG, 0, 100, 40);
    enbossHealthbar = new Statusbar(this.ENDBOSSBAR_IMG, 100, 0, 500);

    constructor(canvas, keyboard, level){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.setWorld();
        this.draw();
        this.run();
    }


    setWorld(){
        this.character.world = this;
    }


    run(){
        setInterval(() => {
            if(this.gameOver()){
                //this.character.walking_sound = null;
                //initStartscreen();
                initGameOverScreen();
            }
            else{
                this.checkEnemyCollisions();
                this.checkObjectCollisions();
                this.checkThrowObjects();
            }

        }, 1000/60);  //TODO - Gamespeed FPS settings if it doesnt run smoothly
    }


    gameOver(){
        return this.character.energy <= 0;
    }

    //TODO - Clear all Intervalls (Audio and Animations)
    cancelAllIntervalls(){
        
    }

    checkEnemyCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isColliding(enemy) && !this.character.isAboveGround() 
            && !(enemy.isDead) && this.character.characterHitCooldown()){
                this.character.hit();
                this.healthbar.setPercentage(this.character.energy, this.HEALTHBAR_IMG)
            };
            if(this.character.isColliding(enemy) && this.character.isAboveGround()){
                enemy.hitChicken(this.level, enemy.iD);
            }
        })
    }


    checkObjectCollisions(){
        this.checkCoinCollision();
        this.checkBottleCollision();
        this.checkThrowObjectsCollision();
    }


    checkCoinCollision(){
        this.level.coins.forEach(coin => {
            if(this.character.isColliding(coin)){
                this.coinbar.fillCoinbar();
                this.coinbar.setPercentage(this.coinbar.coinEnergy, this.COINBAR_IMG);
                setTimeout(() => {
                    coin.deleteCoin(this.level, coin.iD);
                }, 30); 
            }
        });
    }


    checkBottleCollision(){
        this.level.bottles.forEach(bottle => {
            if(this.character.isColliding(bottle)){
                this.bottlebar.fillBottlebar();
                this.bottleCount++;
                this.bottlebar.setPercentage(this.bottlebar.bottleEnergy, this.BOTTLEBAR_IMG);
                bottle.deleteBottle(this.level, bottle.iD);
            }
        });
    }


    checkThrowObjectsCollision(){
        this.level.enemies.forEach(enemy => {
            this.throwableObjects.forEach(bottleThrow => {
                if(bottleThrow.isColliding(enemy)){
                    if(enemy instanceof Chicken){
                        enemy.hitChicken(this.level, enemy.iD);
                        bottleThrow.animateSplash();
                    }
                    if(enemy instanceof SmallChicken){
                        enemy.hitChicken(this.level, enemy.iD);
                        bottleThrow.animateSplash();
                    }
                    if(enemy instanceof Endboss && this.endbossHitCooldown()){
                        console.log('hit Endboss')
                        
                        //Endbosshealthbar behavior
                        this.enbossHealthbar.emptyEndbossHealthbar();
                        this.enbossHealthbar.setPercentage(this.enbossHealthbar.endbossEnergy, this.ENDBOSSBAR_IMG);
                        
                        //Bottle behavior
                        bottleThrow.animateSplash();
                        
                        //Endboss behavior
                        this.getLastEndbossHit();
                        enemy.isHurt();
                        if(this.enbossHealthbar.endbossEnergy <= 0){
                            enemy.isDead();
                            setTimeout(() => {
                                enemy.deleteEndboss(this.level, enemy.iD)
                            }, 2000);
                        }
                    }
                }
            });
        });
    }


    checkThrowObjects(){
        if(this.keyboard.D && this.bottleCount > 0){
            let bottleThrow = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            if(this.throwCooldown()){
                this.throwableObjects.push(bottleThrow);
                console.log(this.throwableObjects.length);
                this.getLastThrow();
                this.bottleCount--;
                this.bottlebar.emptyBottlebar();
                this.bottlebar.setPercentage(this.bottlebar.bottleEnergy, this.BOTTLEBAR_IMG);
            }
        }
    }


    throwCooldown(){
        let timepassed = new Date().getTime() - this.lastThrow; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed > 1.5;
    }


    getLastThrow(){
        this.lastThrow = new Date().getTime();
    }

    
    endbossHitCooldown(){
        let timepassed = new Date().getTime() - this.lastEndbossHit; //Difference in ms
        timepassed = timepassed / 1000; //Difference in s
        return timepassed > 1.5;
    }


    getLastEndbossHit(){
        this.lastEndbossHit = new Date().getTime();
    }
    

    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.addObjectsToMap(this.level.backgroundObjects);
        
        if(!(this.level == startScreen) && !(this.level == gameOverScreen)){
            this.ctx.translate(this.camera_x, 0); //verschiebt die Kamera nach rechts
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.throwableObjects);
            this.ctx.translate(-this.camera_x, 0); //Back

            //Space for fixed objects
            if(!(this.level == startScreen) && !(this.level == gameOverScreen)){
                this.addToMap(this.healthbar);
                this.addToMap(this.coinbar);
                this.addToMap(this.bottlebar);
                
                //TODO - better way to calculate the shown enbossbar
                if(this.character.x > (this.level.level_end_x - 350)){
                    this.addToMap(this.enbossHealthbar);
                }
            }
            
            //Focous camera on character
            this.ctx.translate(this.camera_x, 0); //Forwards
            if(!(this.level == startScreen) && !(this.level == gameOverScreen)){
                this.addToMap(this.character);
            }
            this.ctx.translate(-this.camera_x, 0); //verschiebt die Kamera nach links


        }

        //Objects for Startscreen
        if(this.level == startScreen)
        {
            this.addObjectsToMap(this.level.startscreenObjects);
            //TODO New add to map function for textObjects?
            this.addTextObject("Left =", 40, 400);
            this.addTextObject("Right =", 200, 400);
            this.addTextObject("Jump =", 380, 400);
            this.addTextObject("Throw = D", 570, 400);
        }

        if(this.level == gameOverScreen){
            this.addObjectsToMap(this.level.startscreenObjects);
        }
    

        self = this //workaround, da this nicht in eine funktion gegeben werden kann. Draw wird immer wieder aufgerufen ohne, dass es crashed
        requestAnimationFrame(function(){
            self.draw();
        });
    }


    addTextObject(text, x, y){
        this.ctx.font = "30px Arial";
        this.ctx.fillText(text, x, y);
    }


    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo){
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}