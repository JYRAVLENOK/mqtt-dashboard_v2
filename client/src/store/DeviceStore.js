import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = []
        this._selectedDevice = {}
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
}