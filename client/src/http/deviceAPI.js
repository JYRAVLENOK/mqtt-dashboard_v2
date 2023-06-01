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

import {$host} from "./index"

export const createDevice = async (device) => {
    const {data} = await $host.post('api/device/device/', device, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    // console.log(data)
    return data
}

export const fetchDevices = async () => {
    const {data} = await $host.get('api/device/device/')
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/device/' + id)
    return data
}

export const deleteOneDevice = async (id) => {
    const {data} = await $host.delete('api/device/device/' + id)
    return data
}
export const updateOneDevice = async (device) => {
    const id = device.id
    // console.log(id)
    const {data} = await $host.put('api/device/device/' + id, device, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data
}
