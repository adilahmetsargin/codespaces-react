import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import usersReducer from '../features/users/usersSlice';

// Combine all feature reducers into the root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  users: usersReducer,
});

export default rootReducer;
