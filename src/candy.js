import Phaser from 'phaser'

import Consts from './consts'
import Utils from './utils'

export class Candy {
  constructor (scene) {
    var scale = Utils.getScaling()
    var candyType = Phaser.Math.Between(0, 4)
    var startX = Phaser.Math.Between(Consts.CANDY_FRAME_WIDTH / 2 * scale,
      scene.game.config.width - Consts.CANDY_FRAME_WIDTH / 2 * scale)
    var startY = Phaser.Math.Between(75 * scale, 125 * scale)

    var candy = scene.candiesGroup.create(startX, startY, Consts.CANDY_SPRITE_SHEET_KEY, candyType)
      .setScale(scale)
      .setVelocityY(200)
      .setCollideWorldBounds(true)
      .setInteractive()

    candy.body.onWorldBounds = true
  }
}
