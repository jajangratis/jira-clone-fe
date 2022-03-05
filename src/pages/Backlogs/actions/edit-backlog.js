import { initRequest } from '../../../global/actions'
import { backlogTasksActions } from '../../../store/backlogTasks'

// THUNK
export const backlogSubtaskEditData = (data) => {
    console.log({data});
    return async (dispatch) => {
        dispatch(backlogTasksActions.editSubTask({
            type: 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/backlogs/edit`, {
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
            dispatch(backlogTasksActions.editSubTask({
                type: 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_FULFILLED',
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogTasksActions.editSubTask({
                type: 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_REJECTED'
            }))
        }
    }
}