import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import Anime from '../../../models/Anime';

interface AnimeCardWidgetProps {
	anime: Anime;
	onPress: () => void;
}

export default function AnimeCardWidget({
	anime,
	onPress,
}: AnimeCardWidgetProps) {
	return (
		<Pressable onPress={onPress}>
			<View style={styles.card}>
				<Image
					source={{ uri: anime.imageUrl }}
					style={{ width: 64, height: 64, borderRadius: 8, marginEnd: 16 }}
				/>
				<Text>{anime.name}</Text>
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
		margin: 4,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginStart: 16,
		marginEnd: 16,
	},
});
