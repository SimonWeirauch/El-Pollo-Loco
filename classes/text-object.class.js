class TextObject{
    width = 50;
    height = 50;


    /**
     * 
     * @param {string} text text that will be displayed on the canvas
     * @param {property of canvas} ctx getContext function of the canvas HTML-element
     * @param {integer} x horizontal coordinate for placing the image
     * @param {integer} y vertical coordinate for placing the image
     */
    constructor(text, ctx, x, y){
        ctx.font = "24px Arial";
        ctx.fillText(text, x, y);
    }
}