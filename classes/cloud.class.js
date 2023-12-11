class Cloud extends MoveableObject {
    y = 20;
    height = 250;
    width = 500;
    
    
    /**
     * creates a cloud object
     */
    constructor(){
        super().loadImage(' img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();
    }
    
    /**
     * animate the movement of the cloud object
     */
    animate(){
        this.moveLeft();
    }
}