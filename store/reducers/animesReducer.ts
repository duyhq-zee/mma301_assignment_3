import { createSlice } from '@reduxjs/toolkit';
import Anime from '../../models/Anime';

const initialState: { list: Anime[] } = { list: [] };

const animesSlice = createSlice({
	name: 'animes',
	initialState: initialState,
	reducers: {
		setAnimeList: (state, action) => {
			state.list = [...action.payload.list];
		},
		addAnime: (state, action) => {
			state.list.push(action.payload.id);
		},
		removeAnime: (state, action) => {
			state.list = state.list.filter((id) => id !== action.payload.id);
		},
	},
});

export const { setAnimeList, addAnime, removeAnime } = animesSlice.actions;
export default animesSlice.reducer;
