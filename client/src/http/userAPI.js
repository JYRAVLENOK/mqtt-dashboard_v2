import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (username, password, root) => {
    const {data} = await $host.post('api/user/registration', {username, password, root})
    return data
    // const {data} = await $host.post('api/user/registration', {username, password, root})
    // localStorage.setItem('token', data.token)
    // return jwt_decode(data.token)
}
export const login = async (username, password) => {
    const {data} = await $host.post('api/user/login', {username, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const deleteOneUser = async (id) => {
    const {data} = await $authHost.delete('api/user/user/' + id)
    return data
}
export const getAllUsers = async () => {
    const {data} = await $authHost.get('api/user/users')
    return data
}
