let canvas;
let world 
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    initLevel();
    world = new World(canvas, keyboard);
    
}


function initStartscreen(){
    canvas = document.getElementById('canvas');
    new StartscreenObject('img/10_background_page/left.webp', 50, canvas);
}


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


function fullscreen(){
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}


function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }


  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  