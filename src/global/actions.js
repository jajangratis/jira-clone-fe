import axios from 'axios'

import { initialUrl } from '../global/variables'
import { masterActions } from '../store/master'


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

// THUNK
export const masterData = (data) => {
    return async (dispatch) => {
        dispatch(masterActions.getData({
            type: 'MASTER_DATA_REDUCER_PENDING',
        }))
        const sendRequest = async () => {
            const response = await initRequest('/master/data', {
                method:'get',
                headers: {
                    authorization: ''
                },
                data,
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(masterActions.getData({
                type: 'MASTER_DATA_REDUCER_FULFILLED',
                data: response
            }))
        } catch (error) {
            console.log(error);
            dispatch(masterActions.getData({
                type: 'MASTER_DATA_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}

export const masterUser = (data) => {
    return async (dispatch) => {
        dispatch(masterActions.getUserInfo({
            type: 'MASTER_USER_REDUCER_PENDING',
        }))
        const sendRequest = async () => {
            const response = await initRequest('/master/user', {
                method:'get',
                headers: {
                    authorization: ''
                },
                data,
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(masterActions.getUserInfo({
                type: 'MASTER_USER_REDUCER_FULFILLED',
                data: response
            }))
        } catch (error) {
            console.log(error);
            dispatch(masterActions.getUserInfo({
                type: 'MASTER_USER_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}