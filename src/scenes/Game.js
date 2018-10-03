/* globals __DEV__ */
import Phaser from 'phaser'

import Consts from '../consts'
import Utils from '../utils'
import { Candy } from '../candy'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' })
  }

  get candiesGroup () {
    return this._candies
  }

  init () { }
  preload () { }
  camdyClicked (pointer, gameObject, context) {
    this._score++
    gameObject.destroy()
  }
  create () {
    this.physics.world.on('worldbounds', function (body) {
      console.log('worldbounds ' + body.x + ' , ' + body.y)
      body.gameObject.destroy()
    })

    this._score = 0

    this.input.on('gameobjectdown', this.camdyClicked, this)

    this.physics.world.setBoundsCollision(true, true, true, true)

    this._statics = this.physics.add.staticGroup()
    this._candies = this.physics.add.group()
    this._spawnCandyTimer = 0

    let scale = Utils.getScaling()
    this.add.image(0, 0, Consts.BACKGROUND_IMAGE_KEY).setOrigin(0, 0).setScale(scale)
    var floor = this.add.image(-10, this.game.config.height - Consts.FLOOR_IMAGE_HEIGHT * scale + 10, Consts.FLOOR_IMAGE_KEY)
      .setOrigin(0, 0)
      .setScale(scale)

    console.log('Game height=' + this.game.config.height)
    console.log('Floor height=' + Consts.FLOOR_IMAGE_HEIGHT * scale)
    console.log('Floor Y=' + floor.y + ' , ' + floor.height + ', ' + floor.width)

    this.add.image(0, 0, Consts.SCORE_IMAGE_KEY).setOrigin(0, 0).setScale(scale)

    this._fontStyle = Consts.SCORE_TEXT_FONT_STYLE
    this._scoreText = this.add.text(120 * scale, 8 * scale, this._score, this._fontStyle)
    this._player = this._statics.create(40, this.game.config.height - 130 * scale, Consts.MONSTER_SPRITE_SHEET_KEY)
      .setScale(scale).refreshBody()

    this.anims.create({
      key: Consts.MONSTER_ANIMATION_KEY,
      frames: this.anims.generateFrameNumbers(Consts.MONSTER_SPRITE_SHEET_KEY, { start: 0, end: 12 }),
      frameRate: 24,
      repeat: -1
    })

    this._player.anims.play(Consts.MONSTER_ANIMATION_KEY, true)
  }

  update (timestamp, elapsed) {
    this._candies.getChildren().forEach(function (candy) {
      // to rotate them accordingly
      candy.angle += 5
    })

    this._spawnCandyTimer += elapsed
    if (this._spawnCandyTimer >= 1000) {
      new Candy(this)
      this._spawnCandyTimer = 0
    }

    this._scoreText.text = (this._score)
  }
}
