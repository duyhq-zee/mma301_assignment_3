import React from 'react';
import { FlatList } from 'react-native';
import Anime from '../../../models/Anime';
import AnimeCardWidget from '../../../pages/home/components/AnimeCardWidget';

interface AnimeListProps {
	list: Anime[];
	navigation: any;
}

export default function AnimeList({ list, navigation }: AnimeListProps) {
	return (
		<FlatList
			data={list}
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
	);
}
