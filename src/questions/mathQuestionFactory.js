import Consts from '../consts'
import {default as Question } from "./question";

export default class {
    constructor() {
        this._minimum = 1;
        this._maximum = 9;
        this._operators = ['-', '+', '*', '/'];
        this._numberOfAnswers = 3;
    }


    Generate() {
        var firstNumber = Phaser.Math.Between(this._minimum, this._maximum);
        var secondNumber = Phaser.Math.Between(this._minimum, this._maximum);

        while (firstNumber === secondNumber)
            secondNumber = Phaser.Math.Between(this._minimum, this._maximum);

        var currentOperator = this._operators[Phaser.Math.Between(0, this._operators.length - 1)];

        if (currentOperator === '-' && firstNumber < secondNumber) {
            firstNumber += secondNumber;
            secondNumber = firstNumber - secondNumber;
            firstNumber -= secondNumber;
        }
        else if (currentOperator === '/') {
            while (firstNumber % secondNumber != 0) {
                firstNumber = Phaser.Math.Between(this._minimum, this._maximum);
                secondNumber = Phaser.Math.Between(this._minimum, this._maximum);
            }
        }


        let answers = this.generateAnswers();


        let question = new Question('',answers);

        return question;
    }


    generateAnswers(firstNumber,secondNumber,operator){
        let questionExpression = '{firstNumber} {operator} {secondNumber}'; 
        let correctAnswer = eval(questionExpression);
        let answers = [];

        for (let index = 0; index < this._numberOfAnswers; index++) {
            var answer = index===0?correctAnswer:(index % 2 ? -1 :1 * Math.floor(Math.random() * 3));
            answers.push(answer);
        }

        return answers;
    }
}