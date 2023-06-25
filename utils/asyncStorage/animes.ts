import AsyncStorage from '@react-native-async-storage/async-storage';
import Anime from '../../models/Anime';

const getAnimeListFromAsyncStorage = async () => {
	const animeListString = await AsyncStorage.getItem('animeList');

	let animeList: Anime[] = [];

	if (animeListString) {
		animeList = JSON.parse(animeListString);
	}

	return animeList;
};

export { getAnimeListFromAsyncStorage };
