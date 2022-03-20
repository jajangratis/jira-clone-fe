import { initRequest } from '../../../global/actions'
import { backlogParentChildActions } from '../../../store/backlogParentChild'

// THUNK
export const backlogGetDataParentChild = (data) => {
    return async (dispatch) => {
        dispatch(backlogParentChildActions.getData({
            type: 'BACKLOG_PARENT_CHILD_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/backlogs/parent-child?c_sprint_id`+data, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(backlogParentChildActions.getData({
                type: 'BACKLOG_PARENT_CHILD_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogParentChildActions.getData({
                type: 'BACKLOG_PARENT_CHILD_REDUCER_REJECTED'
            }))
        }
    }
}
