import React, { useLayoutEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
	addFavoriteAnimeId,
	removeFavoriteAnimeId,
} from '../../store/reducers/favoriteAnimeIdsReducer';
import {
	addFavoriteAnimeIdToAsyncStorage,
	removeFavoriteAnimeIdToAsyncStorage,
} from '../../utils/asyncStorage/favoriteAnimeIds';

interface AnimeDetaiPageProps {
	route: any;
	navigation: any;
}

export default function AnimeDetaiPage({
	route,
	navigation,
}: AnimeDetaiPageProps) {
	const { anime } = route.params;

	const favoriteAnimeIds = useSelector(
		(state: any) => state.favoriteAnimeIds.list
	);

	const isFavorite = favoriteAnimeIds.includes(anime.id);

	const dispatch = useDispatch();

	const switchFavoriteState = async () => {
		if (isFavorite) {
			dispatch(removeFavoriteAnimeId({ id: anime.id }));
			await removeFavoriteAnimeIdToAsyncStorage(anime.id);
		} else {
			dispatch(addFavoriteAnimeId({ id: anime.id }));
			await addFavoriteAnimeIdToAsyncStorage(anime.id);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: anime.name,
			headerRight: () => {
				return (
					<Pressable onPress={switchFavoriteState}>
						<Ionicons
							name={isFavorite ? 'heart' : 'heart-outline'}
							color={isFavorite ? 'red' : 'black'}
							size={24}
						/>
					</Pressable>
				);
			},
		});
	}, [navigation, switchFavoriteState]);

	return (
		<View>
			<Text>
				{anime.id} - {anime.name}
			</Text>
		</View>
	);
}
