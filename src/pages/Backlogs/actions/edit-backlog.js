import { initRequest } from '../../../global/actions'
import { backlogTasksActions } from '../../../store/backlogTasks'

// THUNK
export const backlogSubtaskEditData = (data) => {
    console.log({dataED: data});
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
                data,
            }, true)
            return response
        }
        if (data !== undefined) {
            let response = await sendRequest()
            dispatch(backlogTasksActions.editSubTask({
                type: 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_FULFILLED',
            }))
            // try {
            //     let response = await sendRequest()
            //     console.log({response});
            //     dispatch(backlogTasksActions.editSubTask({
            //         type: 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_FULFILLED',
            //     }))
            // } catch (error) {
            //     console.log({error});
            //     dispatch(backlogTasksActions.editSubTask({
            //         type: 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_REJECTED'
            //     }))
            // }
        } else {
            dispatch(backlogTasksActions.editSubTask({
                type: 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_REJECTED'
            }))
        }
    }
}