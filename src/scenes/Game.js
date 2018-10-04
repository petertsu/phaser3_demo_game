/* globals __DEV__ */
import Phaser from 'phaser'
import Consts from '../consts'
import { CandiesFactory } from '../sprites'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })
  }

  init() {
    this._score = 0;
    this._spawnCandyTimer = 0;

    this.physics.world.setBoundsCollision(true, true, true, true);
    this.input.on('gameobjectdown', this.camdyClicked, this);
    
    this._statics = this.physics.add.staticGroup();
    this._candies = this.physics.add.group();

    this.physics.world.on('worldbounds', function (body) {
      body.gameObject.destroy()
    });
    
    this.anims.create({
      key: Consts.MONSTER_ANIMATION_KEY,
      frames: this.anims.generateFrameNumbers(Consts.MONSTER_SPRITE_SHEET_KEY, { start: 0, end: 12 }),
      frameRate: 24,
      repeat: -1
    })
  }

  preload() {
    var bgRatioWidth = this.game.config.width / Consts.BACKGROUND_IMAGE_WIDTH;
    var bgRatioHeight = this.game.config.height / Consts.BACKGROUND_IMAGE_HEIGHT;
    
    this._bgMusic = this.sound.add(Consts.BG_SOUND_KEY,{loop:true});
    this._clickMusic = this.sound.add(Consts.CLICK_SOUND_KEY);
    this.add.image(0, 0, Consts.BACKGROUND_IMAGE_KEY).setOrigin(0, 0).setScale(bgRatioWidth,bgRatioHeight);
    this.add.image(0, 0, Consts.SCORE_IMAGE_KEY).setOrigin(0, 0);
    this.add.image(-10,
      this.game.config.height - Consts.FLOOR_IMAGE_HEIGHT + 10, Consts.FLOOR_IMAGE_KEY)
      .setOrigin(0, 0);
    this._scoreText = this.add.text(110, 10, this._score, Consts.SCORE_TEXT_FONT_STYLE)
  }

  camdyClicked(pointer, gameObject, context) {
    this._clickMusic.play();
    this._score++
    gameObject.destroy()
  }

  create() {
    this._player = this._statics.create(40, this.game.config.height - 130, Consts.MONSTER_SPRITE_SHEET_KEY);
    this._player.anims.play(Consts.MONSTER_ANIMATION_KEY, true);
    this._bgMusic.play();
  }

  update(timestamp, elapsed) {
    this._spawnCandyTimer += elapsed;
    this.rotateCandies();
    this.spawnCandy();
    this._scoreText.text = (this._score)
  }

  spawnCandy() {
    if (this._spawnCandyTimer >= Phaser.Math.Between(700, 1200)) {
      CandiesFactory.spawnCandy(this._candies);
      this._spawnCandyTimer = 0
    }
  }

  rotateCandies() {
    this._candies.getChildren().forEach(function (candy) {
      candy.angle += 1;
    })
  }
}
