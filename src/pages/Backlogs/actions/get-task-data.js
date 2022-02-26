import { initRequest } from '../../../global/actions'
import { backlogTasksActions } from '../../../store/backlogTasks'

// THUNK
export const backlogTaskGetData = (data) => {
    console.log({data});
    return async (dispatch) => {
        dispatch(backlogTasksActions.getData({
            type: 'BACKLOG_TASK_DATA_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/backlogs/task?c_backlog_id=`+data, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(backlogTasksActions.getData({
                type: 'BACKLOG_TASK_DATA_REDUCER_FULFILLED',
                data: response,
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogTasksActions.getData({
                type: 'BACKLOG_TASK_DATA_REDUCER_REJECTED'
            }))
        }
    }
}