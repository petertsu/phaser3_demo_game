export default class {
    constructor(data,correct) {
        this._data = data;
        this._correct = correct;
    }

    get correct() {
        return this._correct;
    }

    get data() {
        return this._data;
    }
}