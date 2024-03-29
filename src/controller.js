export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlaying = false;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        
        this.view.renderStartScreen();
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    updateView() {
        const state = this.game.getState();

        if(state.isGameOver) {
            this.view.renderEndScreen(state);
        } else if(!this.isPlaying) {
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(this.game.getState(state));
        }        
    }

    startTimer() {   
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => { this.update(); }, speed > 0 ? speed : 100); 
        }      
    } 

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    handleKeyDown(event) {
        switch (event.keyCode)  {
            case 13: // ENTER
                if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }   
                break;      
            case 37: // LEFT ARROW
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38: // UP ARROW
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39: // RIGHT ARROW
                this.game.movePieceRight(); 
                this.updateView();
                break;
            case 40: // DOWN ARROW
                this.game.movePieceDown();
                this.updateView();
                break;
        }   
    }
}