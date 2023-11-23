class StartscreenObject extends DrawableObject{
    width = 50;
    height = 50;
    x;
    y;
    
    constructor(imagePath, x, y){

        super().loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}