class StartscreenObject extends DrawableObject{
    width;
    height;
    x;
    y;
    

    /**
     * creates a startscreen object
     * @param {string} imagePath path of the image
     * @param {integer} x horizontal coordinate for placing the image
     * @param {integer} y vertical coordinate for placing the image
     * @param {integer} height height of the startscreen object
     * @param {integer} width width of the startscreen object
     */
    constructor(imagePath, x, y, height, width){
        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
}