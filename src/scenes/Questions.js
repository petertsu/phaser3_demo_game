import Phaser from 'phaser'
import Consts from '../consts'

export default class extends Phaser.Scene {
  constructor () {
    super({ key: 'QuestionsScene' });
    this._answers = [];
  }

  preload () {
    this._questionText  = this.add.text(Consts.GAME_WIDTH *.5 , 120, '', Consts.QUESTION_TEXT_STYLE);
    this._questionText.setOrigin(.5,.5);
  //  this._questionText.x = Consts.GAME_WIDTH;//  - (this._questionText.width * 1);
    this.input.on('gameobjectdown',this.onObjectClicked,this);
  }

  create () {
    this.generateMathQuestion();
  }

  update () {
    //this._questionText.rotation+=0.008;

    this._answers.forEach(function (answer) {
      answer.text.rotation += 0.007;
    })
  }
  onObjectClicked(pointer, gameObject) {
    this.scene.stop('QuestionsScene');
    this.scene.resume('GameScene')
  }

  generateMathQuestion(){
    var firstNumber = Phaser.Math.Between(1,9);
    var secondNumber = Phaser.Math.Between(1,9);

    while(firstNumber===secondNumber)
      secondNumber = Phaser.Math.Between(1,9);

    var operators = ['-','+','*','+','-','*'];
    var operator = operators[Phaser.Math.Between(0,operators.length-1)];
    if(operator==='-' && firstNumber<secondNumber){
      firstNumber+=secondNumber;
      secondNumber=firstNumber-secondNumber;
      firstNumber-=secondNumber;
    }

    var questionText = firstNumber+' '+operator+' '+secondNumber;
    this._questionText.text = questionText + ' =  ?';
   // this._questionText.x = Consts.GAME_WIDTH *.5 - (this._questionText.width * 0.5);

    var correctAnswer = eval(questionText);


		for (let index = 0; index < 3; index++) {
			var x = Phaser.Math.Between(0,Consts.GAME_WIDTH-20);
			var y =  Phaser.Math.Between(200,Consts.GAME_HEIGHT - 100);
			
			var answer = {correct:false,text :null};

			if(index==0){
				answer.text =this.add.text(x, y, correctAnswer, Consts.QUESTION_TEXT_STYLE);
				answer.correct=true;
			}
			else{
				answer.text =this.add.text(x, y, correctAnswer+Math.floor(Math.random()*3) + 1, Consts.QUESTION_TEXT_STYLE);
			}
      
      answer.text.setInteractive();
      answer.text.setOrigin(.5,.5);
			this._answers.push(answer);
		}



  }
}
