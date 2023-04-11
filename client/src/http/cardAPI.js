import {$host} from "./index"

export const createCard = async (card) => {
    const {data} = await $host.post('api/card/card', card)
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