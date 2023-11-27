class World{
    character = new Character();
    level;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    throwableObjects = [];

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
            let index = 0;
            if(this.character.isColliding(enemy) && !this.character.isAboveGround() && !(enemy.isDead)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy)
                console.log(enemy.iD);
                index++;
            };
            if(this.character.isColliding(enemy) && this.character.isAboveGround()){
                enemy.chickenDies();
                enemy.playChickenDeathAnimation();
                console.log(enemy.iD);
                setTimeout(() => {
                    enemy.deleteChicken(this.level, enemy.iD)
                }, 500);
                index++;
            }
        })
    }

    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.translate(this.camera_x, 0); //verschiebt die Kamera nach links
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0); //Back
        
        //Space for fixed objects
        if(!(this.level == startScreen)){
            this.addToMap(this.statusBar);
        }
        

        this.ctx.translate(this.camera_x, 0); //Forwards


        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        
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

