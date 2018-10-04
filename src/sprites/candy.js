import Phaser from 'phaser'
import Consts from '../consts'

class CandiesFactory {
  spawnCandy(group) {
    var candyType = Phaser.Math.Between(0, 4)
    var startX = Phaser.Math.Between(Consts.CANDY_FRAME_WIDTH / 2 ,
      Consts.GAME_WIDTH - Consts.CANDY_FRAME_WIDTH /2 )
    var startY = Phaser.Math.Between(75 , 125 )
    var candy = group.create(startX, startY, Consts.CANDY_SPRITE_SHEET_KEY, candyType);

    candy.body.onWorldBounds = true;
    candy.setVelocityY(200)
      .setCollideWorldBounds(true)
      .setInteractive();
  }
}

const factory = new CandiesFactory();

export default factory;
