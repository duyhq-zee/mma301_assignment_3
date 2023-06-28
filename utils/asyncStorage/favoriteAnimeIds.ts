import AsyncStorage from '@react-native-async-storage/async-storage';

const getFavoriteAnimeIdListFromAsyncStorage = async () => {
	const favoriteString: string | null = await AsyncStorage.getItem(
		'favoriteAnimeIdList'
	);

	let favoriteIdList: string[] = [];

	if (favoriteString) {
		favoriteIdList = JSON.parse(favoriteString);
	}

	return favoriteIdList;
};

const addFavoriteAnimeIdToAsyncStorage = async (newId: string) => {
	let favoriteIdList: string[] = await getFavoriteAnimeIdListFromAsyncStorage();

	favoriteIdList.push(newId);

	let newFavoriteString: string = JSON.stringify(favoriteIdList);

	await AsyncStorage.setItem('favoriteAnimeIdList', newFavoriteString);
};

const removeFavoriteAnimeIdToAsyncStorage = async (removeId: string) => {
	let favoriteIdList: string[] = await getFavoriteAnimeIdListFromAsyncStorage();

	favoriteIdList = favoriteIdList.filter((id) => id != removeId);

	let newFavoriteString: string = JSON.stringify(favoriteIdList);

	await AsyncStorage.setItem('favoriteAnimeIdList', newFavoriteString);
};

export {
	getFavoriteAnimeIdListFromAsyncStorage,
	addFavoriteAnimeIdToAsyncStorage,
	removeFavoriteAnimeIdToAsyncStorage,
};
