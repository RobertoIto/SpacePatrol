(function (window) {

    window.game = window.game || {}

    function GameWin() {
        this.initialize();
    }

    var p = GameWin.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        createjs.Sound.stop();
        this.finalAnimation();
    }

    p.finalAnimation = function (){
        var explosion = new game.FinalExplosion();        
        explosion.x = 300;
        explosion.y = 400;
        createjs.Tween.get(explosion).to({ y: 200 }, 4000)
             .call(this.addComponents, null, this);
        this.addChild(explosion); 
    }
    p.addComponents = function (){
        this.addMessage();
        this.addScore();
        this.addButton();
    }

    p.addMessage = function () {
        var text = new createjs.Text("You win!!!", "40px Showcard Gothic", "#66ff66");
        text.textBaseline = "middle";
        text.textAlign = "center";
        text.x = stage.canvas.height / 2;
        text.y = stage.canvas.height / 3;
        this.addChild(text);
    }
    p.addScore = function () {
        var scorePoint = {x:330, y:310};
        var scoreTxt = new createjs.BitmapText(game.score, spritesheet);
        scoreTxt.x = scorePoint.x;
        scoreTxt.y = scorePoint.y;
        this.addChild(scoreTxt);
    }
    p.addButton = function () {
        var playSameBtn, playBtn, menuBtn;
        var playSameBtnPoint = {x:100, y:380};
        var playBtnPoint = {x:310, y:380};
        var menuBtnPoint = {x:520, y:380};
        var me = this;

        playSameBtn = new ui.SimpleButton('Play Level 3');
        playSameBtn.on('click', this.playLevel3, this);
        playSameBtn.setButton({upColor:'#66ff66', color:'#FFF', borderColor:'#FFF', overColor:'#009933'});
        playSameBtn.x = playSameBtnPoint.x;
        playSameBtn.y = playSameBtnPoint.y;
        this.addChild(playSameBtn);
        
        playBtn = new ui.SimpleButton('Play Again');
        playBtn.on('click', this.playAgain, this);
        playBtn.setButton({upColor:'#66ff66', color:'#FFF', borderColor:'#FFF', overColor:'#009933'});
        playBtn.x = playBtnPoint.x;
        playBtn.y = playBtnPoint.y;
        this.addChild(playBtn);

        menuBtn = new ui.SimpleButton('Main Menu');
        menuBtn.on('click', this.mainMenu, this);
        menuBtn.setButton({upColor:'#66ff66', color:'#FFF', borderColor:'#FFF', overColor:'#009933'});
        menuBtn.x = menuBtnPoint.x;
        menuBtn.y = menuBtnPoint.y;
        this.addChild(menuBtn);
    }
    p.playLevel3 = function (e) {
        game.gLevel = 3;
        game.gNextBossShip = 2;
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.playAgain = function (e) {
        game.gScore = 0;
        game.gNextBossShip = 0;
        game.gNumLives = 5;
        game.gLevel = 1;
        this.dispatchEvent(game.GameStateEvents.GAME);
    }
    p.mainMenu = function (e) {
        this.dispatchEvent(game.GameStateEvents.MAIN_MENU);
    }

    window.game.GameWin = GameWin;

}(window));