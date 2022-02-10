import { configureStore } from '@reduxjs/toolkit' 

import authReducer from './auth';
import sprintsReducer from './sprints'

const store = configureStore({
    reducer: {
        auth: authReducer,
        sprints: sprintsReducer,
    }
});


export default store

