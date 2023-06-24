import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
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
				<Text>{anime.name}</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 12,
		margin: 4,
	},
});
