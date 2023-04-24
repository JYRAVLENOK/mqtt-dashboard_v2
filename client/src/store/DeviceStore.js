import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = []
        this._selectedDevice = {}
        this._types = [
            {id: 1, name: 'Светильник', path: '/lamp'},
            {id: 2, name: 'Автополив', path: '/water'},
            {id: 3, name: 'Кормушка', path: '/feeder'},
            {id: 4, name: 'Дверь', path: '/door'}
        ]
        this._selectedType = {}
        makeAutoObservable(this)
    }

    setDevice(devices) {
        this._devices = devices
    }

    get Devices() {
        return this._devices
    }

    setSelectedDevice(device) {
        this._selectedDevice = device
    }

    get SelectedDevice() {
        return this._selectedDevice
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    get SelectedType() {
        return this._selectedType
    }
}