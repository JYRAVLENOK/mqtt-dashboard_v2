import {makeAutoObservable} from "mobx";

export default class RoomStore {
    constructor() {
        this._rooms = []
        this._selectedRoom = {}
        makeAutoObservable(this)
    }

    setRooms(rooms) {
        this._rooms = rooms
    }

    get rooms() {
        return this._rooms
    }

    setSelectedRoom(room) {
        this._selectedRoom = room
    }

    get selectedRoom() {
        return this._selectedRoom
    }
}