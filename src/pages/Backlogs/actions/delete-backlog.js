import { initRequest } from '../../../global/actions'
import { backlogTasksActions } from '../../../store/backlogTasks'

// THUNK
export const backlogSubtaskDeleteData = (data) => {
    return async (dispatch) => {
        dispatch(backlogTasksActions.deleteSubTask({
            type: 'BACKLOG_TASK_SUBTASK_DELETE_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/backlogs/delete`, {
                method:'post',
                headers: {
                    authorization: ''
                },
                data: data
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            dispatch(backlogTasksActions.deleteSubTask({
                type: 'BACKLOG_TASK_SUBTASK_DELETE_REDUCER_FULFILLED',
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogTasksActions.deleteSubTask({
                type: 'BACKLOG_TASK_SUBTASK_DELETE_REDUCER_REJECTED'
            }))
        }
    }
}