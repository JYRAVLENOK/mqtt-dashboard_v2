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
