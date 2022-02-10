import { initRequest } from '../../../global/actions'
import { sprintActions } from '../../../store/sprints'

// THUNK
export const sprintDeleteData = (data) => {
    return async (dispatch) => {
        dispatch(sprintActions.deleteData({
            type: 'SPRINT_DATA_DELETE_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest('/sprints/delete', {
                method:'post',
                headers: {
                    authorization: ''
                },
                data,
            }, true)
            return response
        }
        const sendRequestGetData = async () => {
            const response = await initRequest('/sprints', {
                method:'get',
                headers: {
                    authorization: ''
                },
            }, true)
            return response
        }
        try {
            await sendRequest()
            let responseData = await sendRequestGetData()
            dispatch(sprintActions.deleteData({
                type: 'SPRINT_DATA_DELETE_REDUCER_FULFILLED',
                data: responseData,
            }))
        } catch (error) {
            console.log({error});
            dispatch(sprintActions.deleteData({
                type: 'SPRINT_DATA_DELETE_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}