let startScreen;

/**
 * Loads all objects for the startscreen
 */
function startLevel(){
    startScreen = new Level(
        [
            
        ],
        [
           
        ],
        [
            new BackgroundObject('img/9_intro_outro_screens/start/startscreen_2.png', 0)
        ],
        [
            
        ],
        [
        ],
        [
            new StartscreenObject('img/10_background_page/left.png', 130, 365, 50, 50),
            new StartscreenObject('img/10_background_page/right.png', 305, 365, 50, 50),
            new StartscreenObject('img/10_background_page/spacebar.png', 490, 365, 50, 50),
            new StartscreenObject('img/10_background_page/fullscreen.png', 650, 10, 40, 40),
            new StartscreenObject('img/10_background_page/soundOn.png', 500, 10, 40, 40),
            new StartscreenObject('img/10_background_page/start.png', 30, 10, 40, 40),
            new StartscreenObject('img/10_background_page/landscape.png', 360, 10, 40, 40),
        ]
    ) 
}