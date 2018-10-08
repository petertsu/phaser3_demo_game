import Phaser from 'phaser'
import Consts from '../consts'

export default class extends  Phaser.GameObjects.Sprite {
  constructor (scene, x,y ) {
    super(scene, x, y, Consts.MONSTER_SPRITE_SHEET_KEY);
    scene.add.existing(this);

    scene.anims.create({
        key: Consts.MONSTER_ANIMATION_KEY,
        frames: scene.anims.generateFrameNumbers(Consts.MONSTER_SPRITE_SHEET_KEY, { start: 0, end: 12 }),
        frameRate: 24,
        repeat: -1
      });

     // scene.anims.play(Consts.MONSTER_ANIMATION_KEY, true);
  }
}

