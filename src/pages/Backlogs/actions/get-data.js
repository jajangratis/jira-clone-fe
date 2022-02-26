import { initRequest } from '../../../global/actions'
import { backlogActions } from '../../../store/backlogs'

// THUNK
export const backlogGetData = (data) => {
    return async (dispatch) => {
        dispatch(backlogActions.getData({
            type: 'BACKLOG_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/backlogs`, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(backlogActions.getData({
                type: 'BACKLOG_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogActions.getData({
                type: 'BACKLOG_DATA_REDUCER_REJECTED'
            }))
        }
    }
}