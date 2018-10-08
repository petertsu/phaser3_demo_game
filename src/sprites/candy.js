import Phaser from 'phaser'
import Consts from '../consts'

export default class extends  Phaser.GameObjects.Sprite {
  constructor (scene, velocityY ) {

    let x  = Phaser.Math.Between(Consts.CANDY_FRAME_WIDTH *.5  ,
      Consts.GAME_WIDTH - Consts.CANDY_FRAME_WIDTH *.5 );
    let y = Phaser.Math.Between(75 , 125 );
  
    super(scene, x, y, Consts.CANDY_SPRITE_SHEET_KEY,Phaser.Math.Between(0, 4));
   
    this._rotationSpeed = Phaser.Math.Between(0, 100) % 2 ===0 ? -0.03 : 0.03;

    scene.add.existing(this);
  }

  preUpdate (time, delta)
  {
      super.preUpdate(time, delta);

      this.rotation += this._rotationSpeed;
  }
}

