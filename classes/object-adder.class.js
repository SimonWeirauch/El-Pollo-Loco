class ObjectAdder{
    /**
     * adds the various level objects onto the canvas
     * @param {object} level current level object 
     * @param {property of world} gamover current status of gameover
     * @param {property of world} camera_x current camera position
     * @param {property of world} isEndbossDead status if endboss is dead
     * @param {Array} throwableObjects array of throwable objects
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     * @param {object} healthbar current healthbar object
     * @param {object} coinbar current coinbar object
     * @param {object} bottlebar current bottlebar object
     * @param {object} character current character object
     * @param {object} endbossHealthbar current endbossHealthbar object
     */
    addAlllevelObjects(level, gameover, camera_x, isEndbossDead, throwableObjects, ctx,
        healthbar, coinbar, bottlebar, character, endbossHealthbar ){
        if(!(level == startScreen)){
            //space for not fixed objects
            if(!(gameover)){ctx.translate(camera_x, 0);} //verschiebt die Kamera nach rechts
            this.drawAllLevelObjects(level, throwableObjects, ctx);
            if(!(gameover)){ctx.translate(-camera_x, 0);}//Back
            //Space for fixed objects
            this.addAllFixedObjects(level, healthbar, coinbar, bottlebar, character, endbossHealthbar, ctx);
            this.addVictoryScreen(isEndbossDead, level, ctx);
            //space for objects that are focused by the camera
            ctx.translate(camera_x, 0); //Forwards
            this.addCharacter(level, gameover, character, ctx);
            ctx.translate(-camera_x, 0); //verschiebt die Kamera nach links
        }
    }
    

    /**
     * draws the objects on the level
     * @param {object} level current level object 
     * @param {Array} throwableObjects array of throwable objects
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    drawAllLevelObjects(level, throwableObjects, ctx){
        this.addObjectsToMap(level.backgroundObjects, ctx);
        this.addObjectsToMap(level.startscreenObjects, ctx );
        this.showCurrentLevel(level, ctx);
        this.addObjectsToMap(level.clouds, ctx);
        this.addObjectsToMap(level.coins, ctx);
        this.addObjectsToMap(level.bottles, ctx);
        this.addObjectsToMap(level.enemies, ctx);
        this.addObjectsToMap(throwableObjects, ctx);
    }


    /**
     * draws the victoryscreen on the level
     * @param {property of world} isEndbossDead status if endboss is dead
     * @param {object} level current level object 
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addVictoryScreen(isEndbossDead, level, ctx){
        if(isEndbossDead){
            this.addObjectsToMap(level.victoryScreen, ctx);
        }
    }


    /**
     * draws the character on the level
     * @param {object} level current level object 
     * @param {property of world} gamover current status of gameover
     * @param {object} character current character object
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addCharacter(level, gameover, character, ctx){
        if(!(level == startScreen) && !(gameover)){
            this.addToMap(character, ctx);
        }
    }


    /**
     * draws the objects for that are fixed regardless of the camera position
     * @param {object} level current level object
     * @param {object} healthbar current healthbar object
     * @param {object} coinbar current coinbar object
     * @param {object} bottlebar current bottlebar object
     * @param {object} character current character object
     * @param {object} endbossHealthbar current endbossHealthbar object
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addAllFixedObjects(level, healthbar, coinbar, bottlebar, character, endbossHealthbar, ctx){
        if(!(level == startScreen)){
            this.addToMap(healthbar, ctx);
            this.addToMap(coinbar, ctx);
            this.addToMap(bottlebar, ctx);
            this.addEndbossHealthbar(character, level, endbossHealthbar, ctx);
        }
    }


    /**
     * add endbosshealthbar if the character is near the endboss
     * @param {object} character current character object
     * @param {object} level current level object
     * @param {object} endbossHealthbar current endbossHealthbar object
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addEndbossHealthbar(character, level, endbossHealthbar, ctx){
        level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss && character.x > (enemy.x - 500)){
                this.addToMap(endbossHealthbar, ctx);
            }
        });
    }


    /**
     * adds the string on to the shield at the beginning of each level
     * @param {object} level current level object
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    showCurrentLevel(level, ctx){
        if(level == level1){
            this.addTextObject("Level 1", 250, 230, ctx);
        }
        else if(level == level2){
            this.addTextObject("Level 2", 250, 230, ctx);
        }
    }


    /**
     * raws the objects for the startscreen
     * @param {Object} level current level object 
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addStartscreenObjects(level, ctx){
        if(level == startScreen){
            this.addObjectsToMap(level.startscreenObjects, ctx);
            this.addTextObject("Left =", 40, 400, ctx);
            this.addTextObject("Right =", 200, 400, ctx);
            this.addTextObject("Jump =", 380, 400, ctx);
            this.addTextObject("Throw = D", 570, 400, ctx);
            this.addTextObject("M =", 30, 40, ctx);
            this.addTextObject("F =", 590, 40, ctx);
        }
    }


    /**
     * draws the objects for the gameover screen
     * @param {property of world} gamover current status of gameover
     * @param {Object} level current level object
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addGameOverObjects(gamover, level, ctx){
        if(gamover){
            this.addObjectsToMap(level.gameoverScreenObjects, ctx);
            document.getElementById('restartButton').classList.remove('d-none');
            
            
        }
    }


    /**
     * displays a text on the canvas
     * @param {string} text text that will be displayed
     * @param {integer} x horizontal coordinate for placing the image
     * @param {integer} y vertical coordinate for placing the image
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addTextObject(text, x, y, ctx){
        ctx.font = "30px ZABRAS";
        ctx.fillText(text, x, y);
    }


    /**
     * adds the different objects of the level to the canvas
     * @param {objects} objects
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addObjectsToMap(objects, ctx){
        objects.forEach(o => {
            this.addToMap(o, ctx);
        });
    }


    /**
     * adds a moveable object to the canvas depending on it´s facing
     * @param {object} mo an instance of a moveable object 
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    addToMap(mo, ctx){
        if(mo.otherDirection) {
            this.flipImage(mo, ctx);
        }
        mo.draw(ctx);
        //mo.drawFrame(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo, ctx);
        }
    }


    /**
     * flips the facing of the moveable object
     * @param {object} mo an instance of a moveable object 
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    flipImage(mo, ctx){
        ctx.save();
        ctx.translate(mo.width, 0);
        ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * flips the  facing of the moveable object back
     * @param {object} mo an instance of a moveable object 
     * @param {property of canvas} ctx getContext function of the canvas HTML-element 
     */
    flipImageBack(mo, ctx){
        mo.x = mo.x * -1;
        ctx.restore();
    }
}