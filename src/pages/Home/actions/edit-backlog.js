import { initRequest } from '../../../global/actions'
import { backlogTasksActions } from '../../../store/backlogTasks'

// THUNK
export const backlogEditData = (data) => {
    console.log({datas: data});
    return async (dispatch) => {
        dispatch(backlogTasksActions.editSubTask({
            type: 'BACKLOG_PARENT_EDIT_CHILD_REDUCER_PENDING',
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
                type: 'BACKLOG_PARENT_EDIT_CHILD_REDUCER_FULFILLED',
            }))
        } catch (error) {
            console.log({error});
            dispatch(backlogTasksActions.editSubTask({
                type: 'BACKLOG_PARENT_EDIT_CHILD_REDUCER_REJECTED'
            }))
        }
    }
}