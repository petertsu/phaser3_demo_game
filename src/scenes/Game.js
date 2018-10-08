/* globals __DEV__ */
import Phaser from 'phaser'
import Consts from '../consts'
import { Candy } from '../sprites'
import { Player } from '../sprites'


export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })

    this._score = 0;
    this._spawnCandyTimer = 0;
    this._questionsTimer = 0;
  }

  init() {
    this._candies = this.physics.add.group();
    this.physics.world.setBoundsCollision(true, true, true, true);

    this.game.events.on('pont', function (points) {
      console.log('point events ' + points);
      this._score += points
    }, this);

    this.input.on('gameobjectdown', this.camdyClicked, this);

    this.physics.world.on('worldbounds', function (body) {
      console.log('worldbounds ');
      body.gameObject.destroy()
    }, this);
  }

  preload() {
    let bgRatioWidth = this.game.config.width / Consts.BACKGROUND_IMAGE_WIDTH;
    let bgRatioHeight = this.game.config.height / Consts.BACKGROUND_IMAGE_HEIGHT;
    this._bgMusic = this.sound.add(Consts.BG_SOUND_KEY, { loop: true });
    this._clickMusic = this.sound.add(Consts.CLICK_SOUND_KEY);

    this.add.image(0, 0, Consts.BACKGROUND_IMAGE_KEY).setOrigin(0, 0).setScale(bgRatioWidth, bgRatioHeight);
    this.add.image(0, 0, Consts.SCORE_IMAGE_KEY).setOrigin(0, 0);
    this.add.image(-10,
      this.game.config.height - Consts.FLOOR_IMAGE_HEIGHT + 10, Consts.FLOOR_IMAGE_KEY)
      .setOrigin(0, 0);

    this._scoreText = this.add.text(110, 10, this._score, Consts.SCORE_TEXT_FONT_STYLE);
  }

  create() {
    this._player = new Player(this, 40, this.game.config.height - 130);
    this._player.anims.play(Consts.MONSTER_ANIMATION_KEY, true);
  }

  update(timestamp, elapsed) {
    this._spawnCandyTimer += elapsed;
    this._questionsTimer += elapsed;

    this.spawnQuestion();
    this.spawnCandy();

    this._scoreText.text = (this._score);
  }

  camdyClicked(pointer, gameObject, context) {

    this._clickMusic.play();
    this.game.events.emit('pont', 1);
    gameObject.destroy()
  }

  spawnQuestion() {
    if (this._questionsTimer >= Phaser.Math.Between(2000, 5000)) {
      this.scene.pause(this.scene.key);
      this.scene.launch('QuestionsScene');
      this._questionsTimer = 0;
    }
  }

  spawnCandy() {
    if (this._spawnCandyTimer >= Phaser.Math.Between(700, 1200)) {
      let candy = new Candy(this);

      this._candies.add(candy);

      candy.setInteractive();
      candy.body.onWorldBounds = true;
      candy.body.setCollideWorldBounds();
      candy.body.setVelocityY((200 + (this._score / 5 * 50)));

      this._spawnCandyTimer = 0;
    }
  }
}
