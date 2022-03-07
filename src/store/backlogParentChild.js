import { createSlice } from '@reduxjs/toolkit' 
const initialState = {
    isLoading: false,
    error: false,
    errorMessage: '',
    result: []
}

const backlogParentChildSlice = createSlice({
    name: 'backlogsParentChild',
    initialState,
    reducers: {
        getData(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'BACKLOG_PARENT_CHILD_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'BACKLOG_PARENT_CHILD_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'BACKLOG_PARENT_CHILD_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
                default:
                    break;
            }
        },
        editData(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'BACKLOG_PARENT_EDIT_CHILD_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'BACKLOG_PARENT_EDIT_CHILD_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'BACKLOG_PARENT_EDIT_CHILD_REDUCER_FULFILLED':
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

export const backlogParentChildActions = backlogParentChildSlice.actions

export default backlogParentChildSlice.reducer