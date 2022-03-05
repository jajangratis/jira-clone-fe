import { initRequest } from '../../../global/actions'
import { backlogTasksActions } from '../../../store/backlogTasks'

// THUNK
export const backlogSubtaskAddData = (data) => {
    console.log({data});
    return async (dispatch) => {
        dispatch(backlogTasksActions.addSubTask({
            type: 'BACKLOG_TASK_SUBTASK_ADD_REDUCER_PENDING',
        }))

        const sendRequest = async () => {
            const response = await initRequest(`/backlogs/add`, {
                method:'post',
                headers: {
                    authorization: ''
                },
                data: data
            }, true)
            return response
        }
        const getTaskData = async () => {
            const response = await initRequest(`/backlogs/task?c_backlog_id=`+data.c_backlog_id_parent, {
                method:'get',
                headers: {
                    authorization: ''
                }
            }, true)
            return response
        }
        try {
            let response = await sendRequest()
            let getData 
            if (data !== undefined) {
                getData = await getTaskData()
            }
            dispatch(backlogTasksActions.addSubTask({
                type: 'BACKLOG_TASK_SUBTASK_ADD_REDUCER_FULFILLED',
                data: data !== undefined ? getData : undefined
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogTasksActions.addSubTask({
                type: 'BACKLOG_TASK_SUBTASK_ADD_REDUCER_REJECTED'
            }))
        }
    }
}