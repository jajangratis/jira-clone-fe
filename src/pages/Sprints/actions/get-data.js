import { initRequest } from '../../../global/actions'
import { sprintActions } from '../../../store/sprints'

// THUNK
export const sprintGetData = (data) => {
    return async (dispatch) => {
        dispatch(sprintActions.getData({
            type: 'SPRINT_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/sprints${data?.search !== null && `?search=${data?.search}`}`, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(sprintActions.getData({
                type: 'SPRINT_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(sprintActions.getData({
                type: 'SPRINT_DATA_REDUCER_REJECTED',
                data: error.response?.data
            }))
        }
    }
}