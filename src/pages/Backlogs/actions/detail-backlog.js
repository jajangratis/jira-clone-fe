import { initRequest } from '../../../global/actions'
import { backlogDetailActions } from '../../../store/backlogsDetail'

// THUNK
export const backlogGetDataDetail = (data) => {
    return async (dispatch) => {
        dispatch(backlogDetailActions.getData({
            type: 'BACKLOG_DATA_DETAIL_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/backlogs/detail`, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(backlogDetailActions.getData({
                type: 'BACKLOG_DATA_DETAIL_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogDetailActions.getData({
                type: 'BACKLOG_DATA_DETAIL_REDUCER_REJECTED'
            }))
        }
    }
}