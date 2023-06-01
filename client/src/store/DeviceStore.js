// Copyright 2023 Alexandr Vasilev
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

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