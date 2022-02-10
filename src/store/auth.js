import { createSlice } from '@reduxjs/toolkit' 
const initialAuthState = {
    isAuthenticated: false,
    isLoading: false,
    error: false,
    result: {
        status:'',
        success: false,
        data: '',
        error: ''
    },
    token:'',
    expired: '',
}
let authStateLocalStorage = null
try {
    authStateLocalStorage = JSON.parse(localStorage.getItem('auth'))
} catch (error) {
    localStorage.removeItem('auth')
}

const authSlice = createSlice({
    name: 'authentication',
    initialState: authStateLocalStorage !== null ? authStateLocalStorage : initialAuthState,
    reducers: {
        login(state, action) {
            console.log(action.payload.type, action.payload);
            switch (action.payload.type) {
                case 'LOGIN_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'LOGIN_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    state.isAuthenticated = false
                    state.result = action.payload?.data
                    break;
                case 'LOGIN_DATA_REDUCER_FULFILLED':
                    state.isLoading = false
                    state.error = false
                    state.result = action.payload?.data.data
                    state.token = action.payload?.data.data.token
                    state.expired = action.payload?.data.data.expired
                    state.isAuthenticated = true
                    localStorage.setItem('auth', JSON.stringify({
                        isAuthenticated: state.isAuthenticated,
                        isLoading: state.isLoading,
                        error: state.error,
                        result: state.result,
                        token:state.token,
                        expired: state.expired,
                    }))
                    break;
            
                default:
                    break;
            }
        },
        logout(state, action) {
            switch (action.payload.type) {
                case 'LOGOUT_DATA_REDUCER_PENDING':
                    state.isLoading = true
                    state.error = false
                    break;
                case 'LOGOUT_DATA_REDUCER_REJECTED':
                    state.isLoading = false
                    state.error = true
                    break;
                case 'LOGOUT_DATA_REDUCER_FULFILLED':
                    localStorage.removeItem('auth')
                    state.isLoading = false
                    state.error = false
                    break;
                default:
                    break;
            }
        },
    }
})

export const authActions = authSlice.actions

export default authSlice.reducer