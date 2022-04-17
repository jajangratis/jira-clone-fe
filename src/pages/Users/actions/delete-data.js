import { initRequest } from '../../../global/actions'
import { usersActions } from '../../../store/users'

// THUNK
export const usersDeleteData = (data) => {
    return async (dispatch) => {
        dispatch(usersActions.deleteUserData({
            type: 'USERS_DELETE_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/auth/user/delete`, {
                method:'post',
                headers: {
                    authorization: ''
                },
                data
            }, true)
            return response
        }
        const getData = async () => {
            const response = await initRequest(`/auth/user/list${data !== undefined ? `?search=${data.search}` : ''}`, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            let getdata = await getData()
            dispatch(usersActions.deleteUserData({
                type: 'USERS_DELETE_DATA_REDUCER_FULFILLED',
                data: getdata,
            }))
        } catch (error) {
            console.log({error});
            dispatch(usersActions.deleteUserData({
                type: 'USERS_DELETE_DATA_REDUCER_REJECTED',
                data: error.response
            }))
        }
    }
}
