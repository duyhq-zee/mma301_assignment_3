import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

interface CategoryListPageProps {
	navigation: any;
}

export default function CategoryListPage({
	navigation,
}: CategoryListPageProps) {
	const animeList = useSelector((state: any) => state.animes.list);

	const categoryList: string[] = [];

	animeList.forEach((anime: any) => {
		if (categoryList.findIndex((c) => anime.category == c) < 0) {
			categoryList.push(anime.category);
		}
	});

	return (
		<FlatList
			data={categoryList}
			renderItem={(item) => (
				<Pressable
					style={styles.categoryCard}
					onPress={() => {
						navigation.navigate('CategoryDetailPage', { category: item.item });
					}}
				>
					<View>
						<Text>{item.item}</Text>
					</View>
				</Pressable>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	categoryCard: {
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 6,
	},
});
