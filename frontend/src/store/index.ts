import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice'
import taskReducer from '../features/tasks/taskSlice'
import logger from 'redux-logger'
import usersReducer from '../features/users/usersSlice'
import contractorReducer from '../features/contractors/contractorSlice'




const store = configureStore({
  reducer: {
    auth: authReducer,
    projects:projectReducer,
    tasks:taskReducer,
    
    users:usersReducer,
    contractors:contractorReducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});





export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;