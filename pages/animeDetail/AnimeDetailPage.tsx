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
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
					<Pressable
						onPress={() => {
							navigation.navigate('FavoriteAnimeListPage');
						}}
					>
						<MaterialCommunityIcons
							name="cards-playing-heart-multiple-outline"
							size={24}
							color="black"
						/>
					</Pressable>
				);
			},
		});
	}, [navigation, switchFavoriteState]);

	return (
		<View>
			<ScrollView>
				<Image source={{ uri: anime.imageUrl }} style={style.image} />
				<View style={style.titleRow}>
					<Text style={style.title}>{anime.name}</Text>

					<Pressable onPress={switchFavoriteState}>
						<Ionicons
							name={isFavorite ? 'heart' : 'heart-outline'}
							color={isFavorite ? 'red' : 'black'}
							size={28}
						/>
					</Pressable>
				</View>

				<Text style={style.description}>{anime.description}</Text>
			</ScrollView>
		</View>
	);
}

const style = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
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
	titleRow: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 16,
		marginBottom: 16,
		paddingLeft: 16,
		paddingRight: 16,
	},
});
