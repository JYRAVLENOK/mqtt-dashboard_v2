import {makeAutoObservable} from "mobx";

export default class CardStore {
    constructor() {
        this._cards = []
        makeAutoObservable(this)
    }

    setCard(cards) {
        this._cards = cards
    }

    getCard() {
        return this._cards
    }

}