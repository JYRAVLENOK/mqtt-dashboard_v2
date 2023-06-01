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

export const createCard = async (card) => {
    const {data} = await $host.post('api/card/create', card, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    // console.log(data)
    return data
}
export const fetchCards = async (room_id) => {
    const {data} = await $host.get('api/card/card/', {params: {
        room_id
        }})
    return data
}
// export const fetchCards = async () => {
//     const {data} = await $host.get('api/card/card/')
//     return data
// }

export const fetchOneCard = async (id) => {
    const {data} = await $host.get('api/card/card/' + id)
    return data
}

export const deleteOneCard = async (id) => {
    const {data} = await $host.delete('api/card/card/' + id)
    return data
}
export const deleteCards = async (device_id) => {
    const {data} = await $host.delete('api/card/card/',
        {params: device_id})
    return data
}