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

    
    character = new Character();
    level;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [];

    healthbar = new Statusbar(this.HEALTHBAR_IMG, 100, 0);
    coinbar = new Statusbar(this.COINBAR_IMG, 0, 50);
    bottlebar = new Statusbar(this.BOTTLEBAR_IMG, 0, 100);

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
            this.checkEnemyCollisions();
            this.checkThrowObjects();
            this.checkObjectCollisions();
        }, 1000/60);                    //TODO - Gamespeed FPS settings if it doesnt run smoothly
    }


    checkThrowObjects(){
        if(this.keyboard.D){
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
        }
    }


    checkEnemyCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !(enemy.isDead)){
                this.character.hit();
                this.healthbar.setPercentage(this.character.energy, this.HEALTHBAR_IMG)
                console.log(enemy.iD);
            };
            if(this.character.isColliding(enemy) && this.character.isAboveGround()){
                enemy.chickenDies();
                enemy.playChickenDeathAnimation();
                console.log(enemy.iD);
                setTimeout(() => {
                    enemy.deleteChicken(this.level, enemy.iD)
                }, 500);

            }
        })
    }

    checkObjectCollisions(){
        this.checkCoinCollision();
        this.checkBottleCollision();
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
                this.bottlebar.setPercentage(this.bottlebar.bottleEnergy, this.BOTTLEBAR_IMG);
                setTimeout(() => {
                    bottle.deleteBottle(this.level, bottle.iD);
                }, 30); 
            }
        });
    }

    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0); //verschiebt die Kamera nach rechts
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        

        //Space for fixed objects
        this.ctx.translate(-this.camera_x, 0); //Back
        if(!(this.level == startScreen)){
            this.addToMap(this.healthbar);
            this.addToMap(this.coinbar);
            this.addToMap(this.bottlebar);
        }
        this.ctx.translate(this.camera_x, 0); //Forwards


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
    
        if(!(this.level == startScreen)){
            this.addToMap(this.character);
        }
        
        this.ctx.translate(-this.camera_x, 0); //verschiebt die Kamera nach links
        

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
        //mo.drawFrame(this.ctx);

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

