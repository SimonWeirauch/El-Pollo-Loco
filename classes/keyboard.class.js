class Keyboard{
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * creates a keyboard object
     */
    constructor(){
        this.keyboardpress();
        this.touchPress();
    }


    /**
     * controls status of keys, when key is pressed and released
     */
    keyboardpress(){
        this.controlKeyPressedEvent();
        this.controlKeyReleasedEvent();
    }


    /**
     * controls status of keys, when key is pressed
     */
    controlKeyPressedEvent(){
        document.addEventListener('keydown', ev => this.keyPressed(ev))         
    }
    

    /**
     * changes the status of the keyboard attributes to true, if
     * the specific character is pressed
     * @param {Event} event 
     */
    keyPressed(event){
        if(event.keyCode == 39){this.RIGHT = true;}
        if(event.keyCode == 37){this.LEFT = true;}
        if(event.keyCode == 40){this.DOWN = true;}
        if(event.keyCode == 32){this.SPACE = true;}
        if(event.keyCode == 68){this.D = true;}
        if(event.keyCode == 70){fullscreen();}
        if(event.keyCode == 77){
            controlBackgroundAudio();
        }
    }
    

    /**
     * controls status of keys, when key is released
     */
    controlKeyReleasedEvent(){
        document.addEventListener('keyup', (ev) => this.keyReleased(ev))
    }


    /**
     * changes the status of the keyboard attributes to false, if
     * the specific character is released
     * @param {Event} event 
     */
    keyReleased(event){
        if(event.keyCode == 39){this.RIGHT = false;}
        if(event.keyCode == 37){this.LEFT = false;}
        if(event.keyCode == 40){this.DOWN = false;}
        if(event.keyCode == 32){this.SPACE = false;}
        if(event.keyCode == 68){this.D = false;}
    }
    

    /**
     * controls status of keys, when key-button is touched
     */
    touchPress(){
        this.touchMoveLeft();
        this.touchMoveRight();
        this.touchJump();
        this.touchThrow();
        this.touchMusic();
    }


    /**
     * moves the character to the left
     */
    touchMoveLeft(){
        document.getElementById('Left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT =  true;
        });
        document.getElementById('Left').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT =  false;
        });
    }


    /**
     * moves the character to the right
     */
    touchMoveRight(){
        document.getElementById('Right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT =  true;
        });
        
        document.getElementById('Right').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT =  false;
        });
    }


    /**
     * lets the character jump
     */
    touchJump(){
        document.getElementById('Jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE =  true;
        });
        
        document.getElementById('Jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        });
    }


    /**
     * lets the character throw a throwable object
     */
    touchThrow(){
        document.getElementById('Throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.D =  true;
        });
        
        document.getElementById('Throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.D = false;
        });
    }


    /**
     * turns the music on or off
     */
    touchMusic(){
        document.getElementById('musicOn').addEventListener('touchstart', (e) => {
            e.preventDefault();
            controlBackgroundAudio();
            document.getElementById('musicOn').classList.add('hide');
            document.getElementById('musicOff').classList.remove('hide');
        });
        
        document.getElementById('musicOff').addEventListener('touchstart', (e) => {
            e.preventDefault();
            controlBackgroundAudio();
            document.getElementById('musicOff').classList.add('hide');
            document.getElementById('musicOn').classList.remove('hide');
        });
    }
}