class TextObject{
    width;
    height;


    /**
     * creates a text object on the canvas
     * @param {string} text text that will be displayed on the canvas
     * @param {property of canvas} ctx getContext function of the canvas HTML-element
     * @param {integer} x horizontal coordinate for placing the image
     * @param {integer} y vertical coordinate for placing the image
     */
    constructor(text, x, y, width, height){
        this.width = width;
        this.height = height;
        ctx.font = "24px Arial";
        ctx.fillText(text, x, y);

    }
}