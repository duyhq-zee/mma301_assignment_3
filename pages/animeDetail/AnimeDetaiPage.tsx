import React, { useLayoutEffect } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
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

interface AnimeDetailPageProps {
	route: any;
	navigation: any;
}

export default function AnimeDetailPage({
	route,
	navigation,
}: AnimeDetailPageProps) {
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
					<View style={style.rightActions}>
						<Pressable onPress={switchFavoriteState}>
							<Ionicons
								name={isFavorite ? 'heart' : 'heart-outline'}
								color={isFavorite ? 'red' : 'black'}
								size={24}
							/>
						</Pressable>
					</View>
				);
			},
		});
	}, [navigation, switchFavoriteState]);

	return (
		<View>
			<ScrollView>
				<Image source={{ uri: anime.imageUrl }} style={style.image} />
				<Text style={style.title}>{anime.name}</Text>
				<Text style={style.description}>{anime.description}</Text>
			</ScrollView>
		</View>
	);
}

const style = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 16,
		marginBottom: 16,
		paddingLeft: 16,
		paddingRight: 16,
	},
	description: {
		fontSize: 14,
		color: '#2A2A2B',
		paddingLeft: 16,
		paddingRight: 16,
		marginBottom: 24,
		lineHeight: 20,
	},
	image: {
		alignSelf: 'stretch',
		resizeMode: 'cover',
		height: 400,
	},
	rightActions: {
		display: 'flex',
		flexDirection: 'row',
	},
});
