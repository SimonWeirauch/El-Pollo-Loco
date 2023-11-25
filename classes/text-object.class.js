class TextObject extends DrawableObject{
    width = 50;
    height = 50;

    constructor(text, ctx, x, y){
        super();
        ctx.font = "24px Arial";
        ctx.fillText(text, x, y);
    }
}