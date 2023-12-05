class StartscreenObject extends DrawableObject{
    width = 50;
    height = 50;
    x;
    y;
    
    constructor(imagePath, x, y, height, width){

        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}