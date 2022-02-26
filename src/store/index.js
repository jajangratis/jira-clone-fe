import { configureStore } from '@reduxjs/toolkit' 

import authReducer from './auth';
import sprintsReducer from './sprints'
import backlogsReducer from './backlogs'
import backlogTasksReducer from './backlogTasks';
import masterTasksReducer from './master';

const store = configureStore({
    reducer: {
        auth: authReducer,
        sprints: sprintsReducer,
        backlogs: backlogsReducer,
        backlogTasks: backlogTasksReducer,
        master: masterTasksReducer,
    }
});


export default store
