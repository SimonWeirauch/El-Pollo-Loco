class TextObject{
    width = 50;
    height = 50;

    constructor(text, ctx, x, y){
       
        ctx.font = "24px Arial";
        ctx.fillText(text, x, y);
    }
}