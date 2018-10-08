import { default as Question } from "./question";
import { default as Answer } from "./answer";

export default class {
    constructor() {
        this._minusOperator = '-';
        this._plusOperator = '+';
        this._multiplicationOperator = '*';
        this._divideOperator = '/';
        this._divideOperatorText = '÷';

        this._minimum = 1;
        this._maximum = 9;
        this._operators = [this._minusOperator, this._plusOperator,
        this._multiplicationOperator, this._divideOperator];

        this._numberOfAnswers = 3;
    }


    Generate() {
        var firstNumber = Phaser.Math.Between(this._minimum, this._maximum);
        var secondNumber = Phaser.Math.Between(this._minimum, this._maximum);

        while (firstNumber === secondNumber)
            secondNumber = Phaser.Math.Between(this._minimum, this._maximum);

        var currentOperator = this._operators[Phaser.Math.Between(0, this._operators.length - 1)];

        if (currentOperator === this._minusOperator && firstNumber < secondNumber) {
            firstNumber += secondNumber;
            secondNumber = firstNumber - secondNumber;
            firstNumber -= secondNumber;
        }
        else if (currentOperator === this._divideOperator) {
            while (firstNumber % secondNumber != 0) {
                firstNumber = Phaser.Math.Between(this._minimum, this._maximum);
                secondNumber = Phaser.Math.Between(this._minimum, this._maximum);
            }
        }

        let answers = this.generateAnswers(firstNumber, secondNumber, currentOperator);
        let questionText = this.generateQuestionText(firstNumber, secondNumber, currentOperator);

        return new Question(questionText, answers);
    }

    generateQuestionText(firstNumber, secondNumber, operator) {
        return (operator === this._divideOperator ? `${firstNumber} ${this._divideOperatorText} ${secondNumber}` :
            `${firstNumber} ${operator} ${secondNumber}`) + ' = ?';
    }

    generateAnswers(firstNumber, secondNumber, operator) {
        let questionExpression = `${firstNumber} ${operator} ${secondNumber}`;
        let correctAnswer = eval(questionExpression);
        let answers = [];

        for (let index = 0; index < this._numberOfAnswers; index++) {
            let answer = new Answer(index === 0 ? correctAnswer :
                (correctAnswer + (index % 2 ? -1 : 1 * Math.floor(1 + Math.random() * 3))),
                index === 0);
            answers.push(answer);
        }

        return answers;
    }
}