class Statusbar extends DrawableObject{
    percentage;
    coinEnergy = 0;
    bottleEnergy = 0;
    endbossEnergy = 100;


    /**
     * creates a statusbar object
     * @param {array} imgStatusArray image array of the statusbar 
     * @param {integer} percentage percentage value of the statusbar
     * @param {integer} x horizontal coordinate for placing the image
     * @param {integer} y vertical coordinate for placing the image
     */
    constructor(imgStatusArray, percentage, y, x){
        super();
        this.loadImages(imgStatusArray);
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 60;
        this.setPercentage(percentage, imgStatusArray);
    }


    /**
     * sets the percentage of the statusbar to the according value and
     * displays the correct statusbar
     * @param {integer} percentage percentage value of the statusbar
     * @param {array} imgStatusArray image array of the statusbar
     */
    setPercentage(percentage, imgStatusArray){
        this.percentage = percentage;
        let path = imgStatusArray[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }


    /**
     * determines the index of the array for the statusbar
     * @returns index
     */
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


    /**
    * increases the current energy of the coinbar if a coin object is collected
    * by an enemy
    */
    fillCoinbar(){
        if((this.coinEnergy < 100)){
            this.coinEnergy += 5;
        }
    }


    /**
    * increases the current energy of the bottlebar if a collectable bottle object is used
    * by an enemy
    */
    fillBottlebar(){
        this.bottleEnergy += 20; 
    }


    /**
    * reduces the current energy of the bottlebar if a throwable object is used
    * by an enemy
    */
    emptyBottlebar(){
        this.bottleEnergy -= 20; 
    }

    
    /**
    * reduces the current energy of the endboss if the endboss is hit
    * by an enemy
    */
    emptyEndbossHealthbar(){
        this.endbossEnergy -= 20;
    }
}