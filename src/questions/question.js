export default class {
    constructor(text,answers) {
        this._questionText = text;
        this._answers = answers;
    }

    get text() {
        return this._questionText;
    }

    get answers() {
        return this._answers;
    }
}