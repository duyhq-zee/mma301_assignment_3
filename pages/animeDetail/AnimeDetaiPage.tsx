import React, { useLayoutEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
	addFavoriteAnime,
	removeFavoriteAnime,
} from '../../store/reducers/favoriteAnimesReducer';

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
		(state: any) => state.favoriteAnimes.ids
	);

	const isFavorite = favoriteAnimeIds.includes(anime.id);

	const dispatch = useDispatch();

	const switchFavoriteState = () => {
		if (isFavorite) {
			dispatch(removeFavoriteAnime({ id: anime.id }));
		} else {
			dispatch(addFavoriteAnime({ id: anime.id }));
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
