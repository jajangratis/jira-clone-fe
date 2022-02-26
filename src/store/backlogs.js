import { createSlice } from '@reduxjs/toolkit' 
const initialState = {
    isLoading: false,
    error: false,
    errorMessage: '',
    result: []
}

const backlogSlice = createSlice({
    name: 'backlogs',
    initialState,
    reducers: {
        getData(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'BACKLOG_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'BACKLOG_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'BACKLOG_DATA_REDUCER_FULFILLED':
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

export const backlogActions = backlogSlice.actions

export default backlogSlice.reducer