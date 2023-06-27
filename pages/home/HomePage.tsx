import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Anime from '../../models/Anime';
import AnimeList from '../../components/feature/animeList/AnimeList';
import { getAnimeListFromAsyncStorage } from '../../utils/asyncStorage/animes';
import { useDispatch, useSelector } from 'react-redux';
import { setAnimeList } from '../../store/reducers/animesReducer';
import { getFavoriteAnimeIdListFromAsyncStorage } from '../../utils/asyncStorage/favoriteAnimeIds';
import { setFavoriteAnimeIdList } from '../../store/reducers/favoriteAnimeIdsReducer';

interface HomePageProps {
	navigation: any;
}

export default function HomePage({ navigation }: HomePageProps) {
	const animeList = useSelector((state: any) => state.animes.list);

	const dispatch = useDispatch();

	const fetchData = async () => {
		const animeList: Anime[] = await getAnimeListFromAsyncStorage();
		dispatch(setAnimeList({ list: animeList }));

		const favoriteAnimeIdList: string[] =
			await getFavoriteAnimeIdListFromAsyncStorage();

		dispatch(setFavoriteAnimeIdList({ list: favoriteAnimeIdList }));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View style={styles.page}>
			<View>
				<AnimeList list={animeList} navigation={navigation} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#e0e0e0',
	},
});
