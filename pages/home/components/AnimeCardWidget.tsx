import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Anime from '../../../models/Anime';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	addFavoriteAnimeId,
	removeFavoriteAnimeId,
} from '../../../store/reducers/favoriteAnimeIdsReducer';
import {
	addFavoriteAnimeIdToAsyncStorage,
	removeFavoriteAnimeIdToAsyncStorage,
} from '../../../utils/asyncStorage/favoriteAnimeIds';

interface AnimeCardWidgetProps {
	anime: Anime;
	onPress: () => void;
}

export default function AnimeCardWidget({
	anime,
	onPress,
}: AnimeCardWidgetProps) {
	const favoriteAnimeIds = useSelector(
		(state: any) => state.favoriteAnimeIds.list
	);

	const dispatch = useDispatch();

	const isFavorite = favoriteAnimeIds.includes(anime.id);

	const switchFavoriteState = async () => {
		if (isFavorite) {
			dispatch(removeFavoriteAnimeId({ id: anime.id }));
			await removeFavoriteAnimeIdToAsyncStorage(anime.id);
		} else {
			dispatch(addFavoriteAnimeId({ id: anime.id }));
			await addFavoriteAnimeIdToAsyncStorage(anime.id);
		}
	};

	return (
		<Pressable onPress={onPress}>
			<View style={styles.card}>
				<Image
					source={{ uri: anime.imageUrl }}
					style={{ width: 72, height: 72, borderRadius: 8, marginEnd: 16 }}
				/>
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{anime.name}</Text>
					<Text
						style={styles.description}
						numberOfLines={2}
						ellipsizeMode="tail"
					>
						{anime.description}
					</Text>
				</View>
				<Pressable onPress={switchFavoriteState}>
					<Ionicons
						name={isFavorite ? 'heart' : 'heart-outline'}
						color={isFavorite ? 'red' : 'black'}
						size={24}
					/>
				</Pressable>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 12,
		paddingEnd: 16,
		margin: 4,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginStart: 16,
		marginEnd: 16,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 4,
	},
	infoContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	description: {
		fontSize: 12,
		color: '#2A2A2B',
		maxWidth: 200,
	},
});
