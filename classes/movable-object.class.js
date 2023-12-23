class MoveableObject extends DrawableObject{
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    CharacterOffsetY = -20;
    ObjectOffsetY;       
    ObjectOffsetX;
    inFall = false;       
    

    /**
     * reduces the y-position if character is in the air
     */
    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * checks if an object is above the ground
     * @returns bool 
     */
    isAboveGround(){
        if(this instanceof ThrowableObject){ //Throwable object should always fall
            return true;
        } else{
            return this.y < 100;
        }
    }


    /**
     * checks if a moveable object collides with another object
     * @param {object} mo moveable object 
     * @returns bool if two objects are colliding
     */
    isColliding(mo){
        this.getOffsetParameter(mo);
        return (this.x + this.width + this.ObjectOffsetX) >= mo.x &&
        this.x + this.ObjectOffsetX <= (mo.x + mo.width) &&
        (this.y + this.CharacterOffsetY + this.height) >= mo.y &&
        (this.y + this.CharacterOffsetY) <= (mo.y + mo.height + this.ObjectOffsetY);
    }


    /**
     * sets the x and y offset parameter of the moveable object
     * @param {object} mo an instance of a moveable object
     */
    getOffsetParameter(mo){
        if(mo instanceof SmallChicken){
            this.ObjectOffsetY = 0;      
            this.ObjectOffsetX = -39; 
        }
        else if(mo instanceof Chicken ){
            this.ObjectOffsetY = 0;      
            this.ObjectOffsetX = -39; 
        }
        else if(mo instanceof Endboss){
            this.ObjectOffsetY = -250;      
            this.ObjectOffsetX = -50;  
        }
        else if(mo instanceof Coin){
            this.ObjectOffsetY = -170;      
            this.ObjectOffsetX = -50; 
        }
        else {
            this.ObjectOffsetY = -170;      
            this.ObjectOffsetX = -70;
        }
    }


    /**
     * displays the animation of a image array
     * @param {array} images array of the images that will be displayed
     */
    playAnimation(images){
        this.checkJumpAnimation()
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * checks if the character y-position is decreasing and sets
     * the current image to fall animation
     */
    checkJumpAnimation(){
        if(this.speedY < 15 && !this.inFall){
            this.currentImage = 2
            this.inFall = true;  
        }
    }

    
    /**
    * increases the x-position of the character to move right
    */
    moveRight(){
        this.x += this.speed;  
    }


    /**
    * reduces the x-position of the character to move left
    */
    moveLeft(){
        this.x -= this.speed; 
    }


    /**
     * sets the speed of the movement of the y-position after a normal jump
     */
    jump(){
        if(!this.isAboveGround()){
            this.inFall = false;
            this.currentImage = 0;
        }
        this.speedY = 30;
    }


    /**
     * sets the speed of the movement of the y-position after a small jump
     */
    smallJump(){
        this.currentImage = 0;
        this.speedY = 20;
    }
}