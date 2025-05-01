import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import jobsReducer from './slices/jobSlice';
import loaderReducer from './slices/loaderSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		users: userReducer,
		jobs: jobsReducer,
		loader: loaderReducer
	},
});
