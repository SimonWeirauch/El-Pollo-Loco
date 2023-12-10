let canvas;
let world 
let keyboard = new Keyboard();
let isBackgroundSoundOff = true;
let isLevelObjectsCleared = false;
background_sound = new Audio('audio/backgroundMusic.mp3');


function init(){
    canvas = document.getElementById('canvas');
    initLevel1();
    clearLevelObjects();
    world = new World(canvas, keyboard, level1);
    controlBackgroundAudio();
}


function loadNextLevel(level){                     
    if(level == level1){
        initNextLevel('level1');
    }
    else if(level == level2){
        initNextLevel('level2');
    }
}


function initNextLevel(levelString){
    canvas = document.getElementById('canvas');
    determineNextLevel(levelString);
    controlBackgroundAudio();
}


function determineNextLevel(levelString){
    if(levelString == 'level1' ){
        initLevel2();
        world = new World(canvas, keyboard, level2);
    }
    if(levelString == 'level2'){
        initStartscreen(); //only this for startscreen
    }
}


function initStartscreen(){
    canvas = document.getElementById('canvas');
    startLevel();
    clearLevelObjects();
    world = new World(canvas, keyboard, startScreen);
    background_sound.pause();
    isBackgroundSoundOff = true;
}


function clearLevelObjects(){
    if(isLevelObjectsCleared){
        world.level.enemies.splice(0, world.level.enemies.length),
        world.level.clouds.splice(0, world.level.clouds.length),
        world.level.backgroundObjects.splice(0, world.level.backgroundObjects.length),
        world.level.coins.splice(0, world.level.coins.length),
        world.level.bottles.splice(0, world.level.bottles.length),
        world.level.startscreenObjects.splice(0, world.level.startscreenObjects.length),
        world.throwableObjects.splice(0, world.throwableObjects.length)
    }
    if(!(isLevelObjectsCleared)){
        isLevelObjectsCleared = true;
    }
}


function controlBackgroundAudio(){
    if(isBackgroundSoundOff){
        background_sound.load('audio/backgroundMusic.mp3');
        background_sound.play();
        background_sound.loop = true;
        isBackgroundSoundOff = false;
    } 
}


//document.addEventListener('mouse')

//CanvasRenderingContext2D.isPointInPath())

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
  