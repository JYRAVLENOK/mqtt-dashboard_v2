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
