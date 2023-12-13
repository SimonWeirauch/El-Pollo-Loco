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

        document.addEventListener('keydown', (event) => {
            if(event.keyCode == 39){
                keyboard.RIGHT = true;
            }
            if(event.keyCode == 37){
                keyboard.LEFT = true;
            }
            if(event.keyCode == 38){
                keyboard.UP = true;
            }
            if(event.keyCode == 40){
                keyboard.DOWN = true;
            }
            if(event.keyCode == 32){
                keyboard.SPACE = true;
            }
            if(event.keyCode == 68){
                keyboard.D = true;
            }
            if(event.keyCode == 70){
                fullscreen();
            }
            if(event.keyCode == 77){
                controlBackgroundAudio();
            }
        })


        document.addEventListener('keyup', (event) => {
            if(event.keyCode == 39){
                keyboard.RIGHT = false;
            }
            if(event.keyCode == 37){
                keyboard.LEFT = false;
            }
            if(event.keyCode == 38){
                keyboard.UP = false;
            }
            if(event.keyCode == 40){
                keyboard.DOWN = false;
            }
            if(event.keyCode == 32){
                keyboard.SPACE = false;
            }
            if(event.keyCode == 68){
                keyboard.D = false;
            }
        })
    }

    
    /**
     * controls status of keys, when key-button is touched
     */
    touchPress(){
        let btnLeft = document.getElementById('Left');
        let btnRight = document.getElementById('Right');
        let btnJump = document.getElementById('Jump');
        let btnThrow = document.getElementById('Throw');
        let btnMusicOn = document.getElementById('musicOn');
        let btnMusicOff = document.getElementById('musicOff');


        btnLeft.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.LEFT =  true;
        });
        
        btnLeft.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.LEFT =  false;
        });
        
        btnRight.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.RIGHT =  true;
        });
        
        btnRight.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.RIGHT =  false;
        });
        
        btnJump.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.SPACE =  true;
        });
        
        btnJump.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.SPACE = false;
        });
        
        btnThrow.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.D =  true;
        });
        
        btnThrow.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard.D = false;
        });

        btnMusicOn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            controlBackgroundAudio();
            btnMusicOn.classList.add('hide');
            btnMusicOff.classList.remove('hide');
        });
        
        btnMusicOff.addEventListener('touchstart', (e) => {
            e.preventDefault();
            controlBackgroundAudio();
            btnMusicOff.classList.add('hide');
            btnMusicOn.classList.remove('hide');
        });
    }
}

