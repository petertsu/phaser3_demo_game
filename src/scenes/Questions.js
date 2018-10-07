import Phaser from 'phaser'
import Consts from '../consts'
import {TextAnswer} from '../sprites'
import {MathQuestionFactory} from '../questions'

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'QuestionsScene' });
    this._answers = [];
    this._questionFactory = new MathQuestionFactory();
  }

  preload() {
    this._questionText = this.add.text(Consts.GAME_WIDTH * .5, 120, '', Consts.QUESTION_TEXT_STYLE);
    this._questionText.setOrigin(.5, .5);
  
    this.game.events.once(Consts.ANSWER_CLICKED_EVENT_KEY,function(textQuestion){
      console.log(Consts.ANSWER_CLICKED_EVENT_KEY + typeof TextAnswer);
      while (this._answers.length) {
        let answer = this._answers.pop();
        answer.destroy();
      }
      this.game.events.emit('pont', textQuestion.correct?1:-1);
      this.scene.stop('QuestionsScene');
      this.scene.resume('GameScene')
    },this);

  }

  create() {
    this.generateMathQuestion();
  }

  update() {
    this._answers.forEach(function (answer) {
      answer.update();
    })
  }
  
  generateAnswerPosition(answer){
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
        return {x:x,y:y};
      }
    }
  }


  generateMathQuestion() {
    var firstNumber = Phaser.Math.Between(1, 9);
    var secondNumber = Phaser.Math.Between(1, 9);

    while (firstNumber === secondNumber)
      secondNumber = Phaser.Math.Between(1, 9);

    var operators = ['-', '+', '*', '/', '+', '-', '*', '/'];
    var operator = operators[Phaser.Math.Between(0, operators.length - 1)];

    if (operator === '-' && firstNumber < secondNumber) {
      firstNumber += secondNumber;
      secondNumber = firstNumber - secondNumber;
      firstNumber -= secondNumber;
    }
    else if (operator === '/') {
      while (firstNumber % secondNumber != 0) {
        firstNumber = Phaser.Math.Between(2, 10);
        secondNumber = Phaser.Math.Between(2, 5);
      }
    }
   
    debugger;
   let temp =  this._questionFactory.Generate();

    var questionText = firstNumber + ' ' + operator + ' ' + secondNumber;
    var correctAnswer = eval(questionText);

    if (operator === '/')
      questionText = firstNumber + ' ÷ ' + secondNumber;

    this._questionText.text = questionText + ' =  ?';

    for (let index = 0; index < 3; index++) {

      var answer = null;
      if (index == 0) {
        answer = new TextAnswer(this,0,0,correctAnswer,true);
      }
      else {
        answer = new TextAnswer(this,0,0,correctAnswer + (index % 2 ? -1 :1 * Phaser.Math.Between(1,3)) ,false);
      }

      const position = this.generateAnswerPosition(answer);
      answer.x = position.x;
      answer.y = position.y;

      this._answers.push(answer);
    }
  }
}
