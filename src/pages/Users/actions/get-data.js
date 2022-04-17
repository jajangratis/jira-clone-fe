import { initRequest } from '../../../global/actions'
import { usersActions } from '../../../store/users'

// THUNK
export const usersGetData = (data) => {
    return async (dispatch) => {
        dispatch(usersActions.userListData({
            type: 'USERS_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
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
            dispatch(usersActions.userListData({
                type: 'USERS_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(usersActions.userListData({
                type: 'USERS_DATA_REDUCER_REJECTED'
            }))
        }
    }
}
