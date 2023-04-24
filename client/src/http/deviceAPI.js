import {$host} from "./index"

export const createDevice = async (device) => {
    const {data} = await $host.post('api/device/device/', device, {
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(data)
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