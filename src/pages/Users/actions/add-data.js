import { initRequest } from '../../../global/actions'
import { usersActions } from '../../../store/users'

// THUNK
export const usersAddData = (data) => {
    return async (dispatch) => {
        dispatch(usersActions.addUserData({
            type: 'USERS_ADD_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/auth/user/add`, {
                method:'post',
                headers: {
                    authorization: ''
                },
                data
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(usersActions.addUserData({
                type: 'USERS_ADD_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(usersActions.addUserData({
                type: 'USERS_ADD_DATA_REDUCER_REJECTED',
                data: error.response
            }))
        }
    }
}
