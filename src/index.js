import Phaser from 'phaser'
import BootScene from './scenes/Boot'
import SplashScene from './scenes/Splash'
import GameScene from './scenes/Game'
import config from './config'

const gameConfig = Object.assign(config, {
  scene: [BootScene, SplashScene, GameScene]
})

class Game extends Phaser.Game {
  constructor () {
    super(gameConfig)
  }
}

if (window.cordova) {
  const app = {
    initialize: function () {
      document.addEventListener(
        'deviceready',
        this.onDeviceReady.bind(this),
        false
      )
    },
    onDeviceReady: function () {
      this.receivedEvent('deviceready')
      const game = new Game();
    },

    receivedEvent: function (id) {
    }
  }

  app.initialize()
}
else{
  const game = new Game();
}
