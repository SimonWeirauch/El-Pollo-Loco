class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 230;
    height = 150;
    width = 100;

    /**
     * loads the drawable image
     * @param {string} path path of the image
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    
    /**
     * draws an image on the canvas
     * @param {property of canvas} ctx getContext function of the canvas HTML-element
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }


    /**
    * loads all images of the given array
    * @param {Array} arr array with all the images that will be loaded
    */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * draws a frame around the various class objects for testing purposes
     * @param {property of canvas} ctx getContext function of the canvas HTML-element
     */
    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Coin
            || this instanceof Bottle || this instanceof SmallChicken || this instanceof Endboss
            || this instanceof ThrowableObject){
         ctx.beginPath();
         ctx.lineWidth = '5';
         ctx.strokeStyle = 'blue';
         ctx.rect(this.x, this.y, this.width, this.height);
         ctx.stroke();
        }
     }

}