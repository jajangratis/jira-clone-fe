import { initRequest } from '../../../global/actions'
import { authActions } from '../../../store/auth'

// THUNK
export const loginAction = (data) => {
    return async (dispatch) => {
        dispatch(authActions.login({
            type: 'LOGIN_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest('/auth/login', {
                method:'post',
                data: {
                    email: data.email,
                    password: data.password,
                }
            }, false)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(authActions.login({
                type: 'LOGIN_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            dispatch(authActions.login({
                type: 'LOGIN_DATA_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        dispatch(authActions.logout({
            type: 'LOGOUT_DATA_REDUCER_PENDING',
        }))
        try {
            dispatch(authActions.logout({
                type: 'LOGOUT_DATA_REDUCER_FULFILLED',
            }))
        } catch (error) {
            dispatch(authActions.logout({
                type: 'LOGOUT_DATA_REDUCER_REJECTED',
            }))
        }
    }
}