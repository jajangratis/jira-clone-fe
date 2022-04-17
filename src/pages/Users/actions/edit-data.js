import { initRequest } from '../../../global/actions'
import { usersActions } from '../../../store/users'

// THUNK
export const usersEditData = (data) => {
    return async (dispatch) => {
        dispatch(usersActions.editUserData({
            type: 'USERS_EDIT_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/auth/user/edit`, {
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
            dispatch(usersActions.editUserData({
                type: 'USERS_EDIT_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(usersActions.editUserData({
                type: 'USERS_EDIT_DATA_REDUCER_REJECTED'
            }))
        }
    }
}
