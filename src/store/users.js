import { createSlice } from '@reduxjs/toolkit' 
const initialusersState = {
    isLoading: false,
    error: false,
    errorMessage: '',
    result: []
}

const usersSlice = createSlice({
    name: 'users',
    initialState: initialusersState,
    reducers: {
        userListData(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'USERS_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'USERS_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.result = action.payload?.data
                    break;
                case 'USERS_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        addUserData(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'USERS_ADD_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'USERS_ADD_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.errorMessage = action.payload?.data.data.msg
                    break;
                case 'USERS_ADD_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = [...state.result, ...action.payload?.data.data]
                    break;
            
                default:
                    break;
            }
        },
        deleteUserData(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'USERS_DELETE_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'USERS_DELETE_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    break;
                case 'USERS_DELETE_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    break;
            
                default:
                    break;
            }
        },
        editUserData(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'USERS_EDIT_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'USERS_EDIT_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    break;
                case 'USERS_EDIT_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    let existingArray = [...state.result]
                    state.result = existingArray.map(x => {
                        if (x.c_user_id === action.payload?.data.data[0].c_user_id) {
                            return action.payload?.data.data[0]
                        } else {
                            return x
                        }
                    })
                    break;
            
                default:
                    break;
            }
        },
    }
})

export const usersActions = usersSlice.actions

export default usersSlice.reducer