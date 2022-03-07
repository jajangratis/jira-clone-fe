import { configureStore } from '@reduxjs/toolkit' 

import authReducer from './auth';
import sprintsReducer from './sprints'
import backlogsReducer from './backlogs'
import backlogsDetailReducer from './backlogsDetail'
import backlogTasksReducer from './backlogTasks';
import masterTasksReducer from './master';
import backlogParentChildReducer from './backlogParentChild';

const store = configureStore({
    reducer: {
        auth: authReducer,
        sprints: sprintsReducer,
        backlogs: backlogsReducer,
        backlogTasks: backlogTasksReducer,
        master: masterTasksReducer,
        backlogsDetail: backlogsDetailReducer,
        backlogsParentChild:backlogParentChildReducer,
    }
});


export default store

