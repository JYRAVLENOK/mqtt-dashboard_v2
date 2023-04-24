import {makeAutoObservable} from "mobx";

export default class CardStore {
    constructor() {
        this._cards = []
        this._selectedCard = {}
        makeAutoObservable(this)
    }

    setCard(cards) {
        this._cards = cards
    }

    get Card() {
        return this._cards
    }

    setSelectedCard(card) {
        this._selectedCard = card
    }

    get SelectedCard() {
        return this._selectedCard
    }
}