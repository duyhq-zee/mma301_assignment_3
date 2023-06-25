import { createSlice } from '@reduxjs/toolkit';

const initialState: { list: string[] } = { list: [] };

const favoriteAnimeIdsSlice = createSlice({
	name: 'favoriteAnimeIds',
	initialState: initialState,
	reducers: {
		setFavoriteAnimeIdList: (state, action) => {
			state.list = [...action.payload.list];
		},
		addFavoriteAnimeId: (state, action) => {
			state.list.push(action.payload.id);
		},
		removeFavoriteAnimeId: (state, action) => {
			state.list = state.list.filter((id) => id !== action.payload.id);
		},
	},
});

export const {
	setFavoriteAnimeIdList,
	addFavoriteAnimeId,
	removeFavoriteAnimeId,
} = favoriteAnimeIdsSlice.actions;
export default favoriteAnimeIdsSlice.reducer;
