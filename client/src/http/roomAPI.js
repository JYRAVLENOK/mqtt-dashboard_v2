import {$host} from "./index"

export const createRoom = async (room) => {
    const {data} = await $host.post('api/room/room', room)
    //console.log(data)
    return data
}
export const fetchRooms = async () => {
    const {data} = await $host.get('api/room/room/')
    return data
}
export const fetchOneRoom = async (id) => {
    const {data} = await $host.get('api/room/room/' + id)
    return data
}