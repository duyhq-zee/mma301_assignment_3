import { createSlice } from '@reduxjs/toolkit';

const initialState: { ids: String[] } = { ids: [] };

const favoriteAnimesSlice = createSlice({
	name: 'favoriteAnimes',
	initialState: initialState,
	reducers: {
		addFavoriteAnime: (state, action) => {
			state.ids.push(action.payload.id);
		},
		removeFavoriteAnime: (state, action) => {
			state.ids = state.ids.filter((id) => id !== action.payload.id);
		},
	},
});

export const { addFavoriteAnime, removeFavoriteAnime } =
	favoriteAnimesSlice.actions;
export default favoriteAnimesSlice.reducer;
