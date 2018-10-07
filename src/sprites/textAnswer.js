import Phaser from 'phaser'
import Consts from '../consts'

export default class extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text,  correct) {
        super(scene, x, y, text, Consts.QUESTION_TEXT_STYLE);
        super.setInteractive();
        super.setOrigin(.5, .5);
        this.once('pointerdown', function(){
            scene.game.events.emit(Consts.ANSWER_CLICKED_EVENT_KEY,this);
        }, this);
        this._correct = correct;
        scene.add.existing(this);
    }

    get correct() {
        return this._correct;
    }

    update(){
        this.rotation += 0.007;
    }
}