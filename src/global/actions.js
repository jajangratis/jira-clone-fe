import axios from 'axios'

import { initialUrl } from '../global/variables'

let initialValueConfig = {
    method: 'get',
    headers: {
        authorization: ''
    },
    data: {

    }
}

export const initRequest = async(url, config=initialValueConfig, setToken=true) => {
    if (setToken) {
        let authStateLocalStorage = null
        try {
            authStateLocalStorage = JSON.parse(localStorage.getItem('auth'))
            config.headers.authorization = authStateLocalStorage.token
        } catch (error) {
            console.log(error);
            return error
        }
    }
    const response = await axios({
        url: `${initialUrl}${url}`,
        method: config.method,
        headers: config.headers,
        data: config.data
    })
    return response.data
}