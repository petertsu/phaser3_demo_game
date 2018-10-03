import Phaser from 'phaser'
//import WebFont from 'webfontloader'
import Consts from '../consts'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'BootScene' })
  }

  preload () {
    this.fontsReady = true;
    this.fontsLoaded = this.fontsLoaded.bind(this)
    //this.add.text(100, 100, 'loading fonts...')

    //this.load.image('loaderBg', './assets/images/loader-bg.png')
   // this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image(Consts.BACKGROUND_IMAGE_KEY,'./assets/images/background.png');
    this.load.image(Consts.FLOOR_IMAGE_KEY, './assets/images/floor.png');
    this.load.image(Consts.SCORE_IMAGE_KEY, './assets/images/score-bg.png');
    
    this.load.spritesheet(Consts.MONSTER_SPRITE_SHEET_KEY, './assets/images/monster-idle.png',{ frameWidth: 103, frameHeight: 131 } );
    this.load.spritesheet(Consts.CANDY_SPRITE_SHEET_KEY, './assets/images/candy.png', { frameWidth: Consts.CANDY_FRAME_WIDTH, frameHeight: Consts.CANDY_FRAME_HEIGHT });
/*
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })*/
  }

  update () {
    if (this.fontsReady) {
      this.scene.start('SplashScene')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
