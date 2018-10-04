import Phaser from 'phaser'
import Consts from '../consts'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'BootScene' });
    this._ready = false;
  }

  preload () {

    this.load.audio(Consts.BG_SOUND_KEY,   './assets/sounds/bg.mp3');
    this.load.audio(Consts.CLICK_SOUND_KEY,   './assets/sounds/click.mp3');
    
    this.load.image(Consts.BACKGROUND_IMAGE_KEY, './assets/images/background.png');
    this.load.image(Consts.FLOOR_IMAGE_KEY, './assets/images/floor.png');
    this.load.image(Consts.SCORE_IMAGE_KEY, './assets/images/score-bg.png');

    this.load.spritesheet(Consts.MONSTER_SPRITE_SHEET_KEY, './assets/images/monster-idle.png', { frameWidth: 103, frameHeight: 131 });
    this.load.spritesheet(Consts.CANDY_SPRITE_SHEET_KEY, './assets/images/candy.png', { frameWidth: Consts.CANDY_FRAME_WIDTH, frameHeight: Consts.CANDY_FRAME_HEIGHT });
    this._ready = true;
  }

  update () {
    if ( this._ready) {
      this.scene.start('SplashScene')
    }
  }
}

