class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 230;
   
   
    height = 150;
    width = 100;

    /**
     * image path für das laden eines unbeweglichen BSildes
     * @param {*} path 
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }

    /**
    * Für das laden der Bilder des Movements
    * @param {Array} arr ['img/image1.png', 'img/image2.png', ...]
    */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    drawFrame(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Coin
            || this instanceof Bottle || this instanceof SmallChicken){
         ctx.beginPath();
         ctx.lineWidth = '5';
         ctx.strokeStyle = 'blue';
         ctx.rect(this.x, this.y, this.width, this.height);
         ctx.stroke();
        }
     }

}