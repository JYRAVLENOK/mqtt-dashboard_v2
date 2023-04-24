import {$host} from "./index"

const options = {
    headers: {
        'Content-Type': 'application/json'
    }
}
export const createCard = async (card) => {
    const {data} = await $host.post('api/card/create', card, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    console.log(data)
    return data
}
export const fetchCards = async () => {
    const {data} = await $host.get('api/card/card/')
    return data
}

export const fetchOneCard = async (id) => {
    const {data} = await $host.get('api/card/card/' + id)
    return data
}

export const deleteOneCard = async (id) => {
    const {data} = await $host.delete('api/card/card/' + id)
    return data
}