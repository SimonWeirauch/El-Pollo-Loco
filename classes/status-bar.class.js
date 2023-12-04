class Statusbar extends DrawableObject{
    percentage;
    coinEnergy = 0;
    bottleEnergy = 0;

    constructor(imgStatusArray, percentage, y){
        super();
        this.loadImages(imgStatusArray);
        this.x = 40;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setPercentage(percentage, imgStatusArray);
    }


    setPercentage(percentage, imgStatusArray){
        this.percentage = percentage;
        let path = imgStatusArray[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }


    resolveImageIndex(){
        if(this.percentage >= 100){
            return 5
        }else if(this.percentage >= 80){
            return 4
        }else if(this.percentage >= 60){
            return 3
        }else if(this.percentage >= 40){
            return 2
        }else if(this.percentage >= 20){
            return 1
        }else{
            return 0
        }
    }


    fillCoinbar(){
        if((this.coinEnergy < 100)){
            this.coinEnergy += 5;
        }
    }


    fillBottlebar(){
        this.bottleEnergy += 20; 
    }


    emptyBottlebar(){
        this.bottleEnergy -= 20; 
    }

}