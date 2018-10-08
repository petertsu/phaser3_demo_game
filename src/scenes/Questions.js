import Phaser from 'phaser'
import Consts from '../consts'
import { TextAnswer } from '../sprites'
import { MathQuestionFactory } from '../questions'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionsScene' });
    this._answers = [];
    this._questionFactory = new MathQuestionFactory();
  }

  preload() {
    this._questionText = this.add.text(Consts.GAME_WIDTH * .5, 120, '', Consts.QUESTION_TEXT_STYLE);
    this._questionText.setOrigin(.5, .5);

    this.game.events.once(Consts.ANSWER_CLICKED_EVENT_KEY, function (textQuestion) {
      console.log(Consts.ANSWER_CLICKED_EVENT_KEY + typeof TextAnswer);
      while (this._answers.length) {
        let answer = this._answers.pop();
        answer.destroy();
      }
      this.game.events.emit('pont', textQuestion.correct ? 1 : -1);
      this.scene.stop('QuestionsScene');
      this.scene.resume('GameScene')
    }, this);

  }

  create() {
    this.generateMathQuestion();
  }

  update() {
    this._answers.forEach(function (answer) {
      answer.update();
    })
  }

  generateAnswerPosition(answer) {
    while (true) {
      let x = Phaser.Math.Between(answer.width * .5, Consts.GAME_WIDTH - answer.width * .5);
      let y = Phaser.Math.Between(120 + answer.height, Consts.GAME_HEIGHT - 100);
      let good = true;

      for (let index = 0; index < this._answers.length; index++) {
        const element = this._answers[index];
        if (Math.abs(element.x - x) < answer.width &&
          Math.abs(element.y - y) < answer.height
        ) {
          good = false;
          break;
        }
      }
      if (good) {
        return { x: x, y: y };
      }
    }
  }


  generateMathQuestion() {
    let question = this._questionFactory.Generate();

    this._questionText.text = question.text;

    for (let index = 0; index < question.answers.length; index++) {
      const answer = question.answers[index];
      let textAnswer = new TextAnswer(this, 0, 0, answer.data, answer.correct);
      const position = this.generateAnswerPosition(textAnswer);
      textAnswer.x = position.x;
      textAnswer.y = position.y;
      this._answers.push(textAnswer);
    }
  }
}
