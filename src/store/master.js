import { createSlice } from '@reduxjs/toolkit' 
const initialState = {
    isLoading: false,
    error: false,
    errorMessage: '',
    result: {
        data:[],
        user: [],
    }
}

const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        getData(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'MASTER_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'MASTER_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result.data = action.payload?.data
                    break;
                case 'MASTER_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result.data = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        getUserInfo(state, action) {
            console.log(action.payload.type, {state});
            switch (action.payload.type) {
                case 'MASTER_USER_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'MASTER_USER_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result.user = action.payload?.data
                    break;
                case 'MASTER_USER_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result.user = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
    }
})

export const masterActions = masterSlice.actions

export default masterSlice.reducer