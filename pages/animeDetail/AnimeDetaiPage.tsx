import React from 'react';
import { Text, View } from 'react-native';

interface AnimeDetaiPageProps {
	route: any;
}

export default function AnimeDetaiPage({ route }: AnimeDetaiPageProps) {
	const { anime } = route.params;
	return (
		<View>
			<Text>
				{anime.id} - {anime.name}
			</Text>
		</View>
	);
}
