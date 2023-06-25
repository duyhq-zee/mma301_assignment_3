import { configureStore } from '@reduxjs/toolkit';
import animesReducer from './reducers/animesReducer';
import favoriteAnimeIdsReducer from './reducers/favoriteAnimeIdsReducer';

export const store = configureStore({
	reducer: {
		animes: animesReducer,
		favoriteAnimeIds: favoriteAnimeIdsReducer,
	},
});
