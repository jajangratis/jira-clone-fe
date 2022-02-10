import { initRequest } from '../../../global/actions'
import { sprintActions } from '../../../store/sprints'

// THUNK
export const sprintActivateData = (data) => {
    return async (dispatch) => {
        dispatch(sprintActions.activateSprint({
            type: 'SPRINT_DATA_ACTIVATE_REDUCER_PENDING',
        }))
        const sendRequest = async () => {
            const response = await initRequest('/sprints/activate-sprint', {
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
        } catch (error) {
            console.log(error);
            dispatch(sprintActions.activateSprint({
                type: 'SPRINT_DATA_ACTIVATE_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
        try {
            let responseData = await sendRequestGetData()
            dispatch(sprintActions.activateSprint({
                type: 'SPRINT_DATA_ACTIVATE_REDUCER_FULFILLED',
                data: responseData,
            }))
        } catch (error) {
            console.log(error);
            dispatch(sprintActions.activateSprint({
                type: 'SPRINT_DATA_ACTIVATE_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}