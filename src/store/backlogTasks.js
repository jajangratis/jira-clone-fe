import { createSlice } from '@reduxjs/toolkit' 
const initialState = {
    isLoading: false,
    error: false,
    errorMessage: '',
    result: []
}

const backlogTasksSlice = createSlice({
    name: 'backlogTasks',
    initialState,
    reducers: {
        getData(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'BACKLOG_TASK_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'BACKLOG_TASK_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'BACKLOG_TASK_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        addSubTask(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'BACKLOG_TASK_SUBTASK_ADD_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'BACKLOG_TASK_SUBTASK_ADD_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'BACKLOG_TASK_SUBTASK_ADD_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        editSubTask(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    break;
                case 'BACKLOG_TASK_SUBTASK_EDIT_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    break;
            
                default:
                    break;
            }
        },
        deleteSubTask(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'BACKLOG_TASK_SUBTASK_DELETE_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'BACKLOG_TASK_SUBTASK_DELETE_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    break;
                case 'BACKLOG_TASK_SUBTASK_DELETE_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    break;
            
                default:
                    break;
            }
        },
    }
})

export const backlogTasksActions = backlogTasksSlice.actions

export default backlogTasksSlice.reducer