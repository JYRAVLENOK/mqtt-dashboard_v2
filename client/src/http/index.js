import axios from "axios";
axios.defaults.headers.common['Accept'] = 'application/json'
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    // config.headers.common['Accept'] = 'application.json'
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}