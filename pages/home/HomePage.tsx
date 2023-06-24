import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import AnimeCardWidget from './components/AnimeCardWidget';
import Anime from '../../models/Anime';

interface HomePageProps {
	navigation: any;
}

export default function HomePage({ navigation }: HomePageProps) {
	const animeList: Anime[] = [
		new Anime('1', 'Attack on Titan'),
		new Anime('2', 'One Piece'),
		new Anime('3', 'Naruto'),
		new Anime('4', 'Death Note'),
		new Anime('5', 'Dragon Ball Z'),
		new Anime('6', 'Fullmetal Alchemist: Brotherhood'),
		new Anime('7', 'My Hero Academia'),
		new Anime('8', 'Sword Art Online'),
		new Anime('9', 'Code Geass'),
		new Anime('10', 'Hunter x Hunter'),
	];

	return (
		<View style={styles.page}>
			<View style={styles.animeListContainer}>
				<FlatList
					data={animeList}
					keyExtractor={(item) => item.id.toString()}
					renderItem={(item) => (
						<AnimeCardWidget
							anime={item.item}
							onPress={() => {
								navigation.navigate('AnimeDetail', { anime: item.item });
							}}
						/>
					)}
				></FlatList>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#e0e0e0',
	},
	animeListContainer: {
		padding: 16,
	},
});
