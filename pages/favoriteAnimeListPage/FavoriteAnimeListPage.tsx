import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimeList from '../../components/feature/animeList/AnimeList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Anime from '../../models/Anime';
import { getFavoriteAnimeIdListFromAsyncStorage } from '../../utils/asyncStorage/favoriteAnimeIds';
import { useSelector } from 'react-redux';

interface FavoriteAnimeListPageProps {
	navigation: any;
}

export default function FavoriteAnimeListPage({
	navigation,
}: FavoriteAnimeListPageProps) {
	const animeList: Anime[] = useSelector((state: any) => state.animes.list);
	const favoriteAnimeIdList: string[] = useSelector(
		(state: any) => state.favoriteAnimeIds.list
	);

	const [favoriteAnimeList, setFavoriteAnimeList] = useState<Anime[]>([]);

	useEffect(() => {
		const favoriteAnimeListData: Anime[] = [];
		favoriteAnimeIdList.forEach((id) => {
			const anime: Anime | undefined = animeList.find(
				(anime) => anime.id == id
			);
			if (anime) {
				favoriteAnimeListData.push(anime);
			}
		});
		setFavoriteAnimeList(favoriteAnimeListData);
	}, [favoriteAnimeIdList]);

	return (
		<View style={styles.page}>
			<View>
				<AnimeList list={favoriteAnimeList} navigation={navigation} />
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
