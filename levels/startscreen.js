let startScreen;
//let canvas = document.getElementById('canvas');
//let ctx = canvas.getContext('2d');

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
            new StartscreenObject('img/10_background_page/left.png', 130, 365),
            new StartscreenObject('img/10_background_page/right.png', 305, 365),
            new StartscreenObject('img/10_background_page/spacebar.png', 490, 365),
            new StartscreenObject('img/10_background_page/fullscreen.png', 650, 10),
            new StartscreenObject('img/10_background_page/soundOn.png', 580, 10),
            new StartscreenObject('img/10_background_page/start.png', 50, 10),
            //new StartscreenObject('img/10_background_page/soundOff.png', 580, 10),
        ]
    )

    
}