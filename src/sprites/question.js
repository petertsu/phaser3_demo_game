import Phaser from 'phaser'
import Consts from '../consts'

class QuestionsFactory {
  constructor() {
    this._questionText = null;
  }

  spawnQuestion(scene) {
    scene.scene.pause(scene.key);
    scene.scene.launch('QuestionsScene');
  }
}

const factory = new QuestionsFactory();

export default factory;
