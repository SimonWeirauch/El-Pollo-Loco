class MoveableObject extends DrawableObject{
   
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    CharacterOffsetY = -20;
    ObjectOffsetY = 0;       //-170 //TODO - Check Offset for Collision
    
    ObjectOffsetX = 0;        //-40
    
    
    

    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround(){
        if(this instanceof ThrowableObject){ //Throwable object should always fall
            return true;
        } else{
            return this.y < 100;
        }
       
    }


    isColliding(mo){
        return (this.x + this.width + this.ObjectOffsetX) >= mo.x &&
        this.x + this.ObjectOffsetX <= (mo.x + mo.width) &&
        (this.y + this.CharacterOffsetY + this.height) >= mo.y &&
        (this.y + this.CharacterOffsetY) <= (mo.y + mo.height + this.ObjectOffsetY);
      
        
        /*
        Original
        this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height
        
        */
    }



    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
        
    }

    moveLeft(){
        this.x -= this.speed;
        
    }

    jump(){
        this.speedY = 30;
    }
   
}