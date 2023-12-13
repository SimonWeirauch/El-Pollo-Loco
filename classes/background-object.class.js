class BackgroundObject extends MoveableObject {
    width = 720;
    height = 480;
    
    /**
     * creates a background object
     * @param {string} imagePath path of image
     * @param {integer} x horizontal coordinate for placing the backgroundimage
     */
    constructor(imagePath, x){
        super().loadImage(imagePath)
        this.x = x;
        this.y = 420 - this.height;
    }
}