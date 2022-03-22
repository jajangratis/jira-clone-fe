import { createSlice, current } from '@reduxjs/toolkit' 
const initialState = {
    isLoading: false,
    error: false,
    errorMessage: '',
    result: []
}

const retroSlice = createSlice({
    name: 'retro',
    initialState,
    reducers: {
        getData(state, action) {
            switch (action.payload.type) {
                case 'RETRO_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'RETRO_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'RETRO_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
                default:
                    break;
            }
        },
        addData(state, action) {
            switch (action.payload.type) {
                case 'RETRO_ADD_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'RETRO_ADD_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'RETRO_ADD_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    let updateState = current(state)
                    // updateState.result.push(action.payload?.data.data[0])
                    state.result = [...updateState.result, action.payload?.data.data[0]]
                    break;
            
                default:
                    break;
            }
        },
        deleteData(state, action) {
            switch (action.payload.type) {
                case 'RETRO_DATA_DELETE_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'RETRO_DATA_DELETE_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'RETRO_DATA_DELETE_REDUCER_FULFILLED':
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

export const retroActions = retroSlice.actions

export default retroSlice.reducer