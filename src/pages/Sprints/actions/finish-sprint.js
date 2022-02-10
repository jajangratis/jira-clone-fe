import { initRequest } from '../../../global/actions'
import { sprintActions } from '../../../store/sprints'

// THUNK
export const sprintFinishData = (data) => {
    return async (dispatch) => {
        dispatch(sprintActions.finishSprint({
            type: 'SPRINT_DATA_FINISH_REDUCER_PENDING',
        }))
        const sendRequest = async () => {
            const response = await initRequest('/sprints/finish-sprint', {
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
            dispatch(sprintActions.finishSprint({
                type: 'SPRINT_DATA_FINISH_REDUCER_FULFILLED',
                data: responseData,
            }))
        } catch (error) {
            console.log({error});
            dispatch(sprintActions.finishSprint({
                type: 'SPRINT_DATA_FINISH_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}