import { initRequest } from '../../../global/actions'
import { sprintActions } from '../../../store/sprints'

// THUNK
export const sprintEditData = (data) => {
    return async (dispatch) => {
        dispatch(sprintActions.editData({
            type: 'SPRINT_DATA_EDIT_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            console.log({data});
            const response = await initRequest('/sprints/edit', {
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
            dispatch(sprintActions.editData({
                type: 'SPRINT_DATA_EDIT_REDUCER_FULFILLED',
                data: responseData,
            }))
        } catch (error) {
            console.log({error});
            dispatch(sprintActions.editData({
                type: 'SPRINT_DATA_EDIT_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}