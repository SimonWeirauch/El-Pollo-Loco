let gameOverScreen;

function endLevel(){
    gameOverScreen = new Level(
        [
            
        ],
        [
           
        ],
        [
            new BackgroundObject('img/5_background/first_half_background.png', 0),
            new BackgroundObject('img/9_intro_outro_screens/game_over/oh_no_you_lost.png', 0)
        ],
        [
            
        ],
        [
        ],
        [
            new StartscreenObject('img/10_background_page/start.png', 50, 10),
        ])
}