let canvas;
let world 
let keyboard;
let isLevelObjectsCleared = false;
let background_sound = new Audio('audio/backgroundMusic.mp3');


/**
 * initializes level 1 
 */
function init(){
    canvas = document.getElementById('canvas');
    document.getElementById('hud').classList.add('showOnMobile');
    initLevel1();
    clearLevelObjects();
    world = new World(canvas, keyboard, level1);
    if(background_sound.muted){
        background_sound.muted = false;
    }
    if(!(background_sound.muted)){
        background_sound.play();
    }
}


/**
 * initializes the next level
 * @param {String} levelString name of the level
 */
function initNextLevel(levelString){
    canvas = document.getElementById('canvas');
    determineNextLevel(levelString);
}


/**
 * controls the music played in the background
 */
function controlBackgroundAudio(){
    if(!(background_sound.muted)){
        background_sound.muted = true;

    }
    else{
        background_sound.loop = true;
        background_sound.muted = false;
        background_sound.play();
    } 
}


/**
 * initializes level
 * @param {Object} level current level object
 */
function loadNextLevel(level){                     
    if(level == level1){
        initNextLevel('level1');
    }
    else if(level == level2){
        initNextLevel('level2');
    }
}


/**
 * determines next level according to the provided levelString
 * @param {String} levelString 
 */
function determineNextLevel(levelString){
    if(levelString == 'level1' ){
        initLevel2();
        world = new World(canvas, keyboard, level2);
    }
    if(levelString == 'level2'){
        background_sound.muted = false;
        initStartscreen(background_sound.muted);
    }
}


/**
 * initializes startscreen
 */
function initStartscreen(isSoundMuted){
    canvas = document.getElementById('canvas');
    document.getElementById('hud').classList.remove('showOnMobile');
    if(!(isSoundMuted)){
        background_sound.muted = true;
    }
    
    
    keyboard = new Keyboard();
    startLevel();
    clearLevelObjects();
    world = new World(canvas, keyboard, startScreen);
}


/**
 * clears all objects of the current level before loading the objects for the next
 */
function clearLevelObjects(){
    if(isLevelObjectsCleared){
        world.level.enemies.splice(0, world.level.enemies.length);
        world.level.clouds.splice(0, world.level.clouds.length);
        world.level.backgroundObjects.splice(0, world.level.backgroundObjects.length);
        world.level.coins.splice(0, world.level.coins.length);
        world.level.bottles.splice(0, world.level.bottles.length);
        world.level.startscreenObjects.splice(0, world.level.startscreenObjects.length);
        world.throwableObjects.splice(0, world.throwableObjects.length);
    }
    if(!(isLevelObjectsCleared)){
        isLevelObjectsCleared = true;
    }
}


/**
 * opens fullscreen
 */
function fullscreen(){
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}


/**
 * opens fullscreen on given HTMLElement
 * @param {HTMLElement} element 
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {    
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  }


  /**
   * close fullscreen mode
   */
  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }