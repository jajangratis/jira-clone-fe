import { createSlice } from '@reduxjs/toolkit' 
const initialState = {
    isLoading: false,
    error: false,
    errorMessage: '',
    result: []
}

const sprintSlice = createSlice({
    name: 'sprints',
    initialState,
    reducers: {
        getData(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'SPRINT_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'SPRINT_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'SPRINT_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        addData(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'SPRINT_DATA_ADD_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'SPRINT_DATA_ADD_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.errorMessage = action.payload?.data
                    break;
                case 'SPRINT_DATA_ADD_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        deleteData(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'SPRINT_DATA_DELETE_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'SPRINT_DATA_DELETE_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.errorMessage = action.payload?.data
                    break;
                case 'SPRINT_DATA_DELETE_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        editData(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'SPRINT_DATA_EDIT_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'SPRINT_DATA_EDIT_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.errorMessage = action.payload?.data
                    break;
                case 'SPRINT_DATA_EDIT_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        activateSprint(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'SPRINT_DATA_ACTIVATE_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'SPRINT_DATA_ACTIVATE_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.errorMessage = action.payload?.data
                    break;
                case 'SPRINT_DATA_ACTIVATE_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        finishSprint(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'SPRINT_DATA_FINISH_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'SPRINT_DATA_FINISH_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.errorMessage = action.payload?.data
                    break;
                case 'SPRINT_DATA_FINISH_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
    }
})

export const sprintActions = sprintSlice.actions

export default sprintSlice.reducer