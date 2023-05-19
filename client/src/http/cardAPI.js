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