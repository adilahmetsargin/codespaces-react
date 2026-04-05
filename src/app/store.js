import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// Configure the Redux store with Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
});

export default store;
