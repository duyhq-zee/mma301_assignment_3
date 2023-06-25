import { configureStore } from '@reduxjs/toolkit';
import favoriteAnimesReducer from './reducers/favoriteAnimesReducer';

export const store = configureStore({
	reducer: {
		favoriteAnimes: favoriteAnimesReducer,
	},
});
