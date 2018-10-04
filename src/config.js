import Phaser from 'phaser'
import Consts from './consts'

export default {
  type: Phaser.AUTO,
  parent: 'phaser-app',
  width: Consts.GAME_WIDTH,
  height: Consts.GAME_HEIGHT,
  resolution: Math.floor(window.devicePixelRatio),
  localStorageName: 'phaseres6webpack',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
}
