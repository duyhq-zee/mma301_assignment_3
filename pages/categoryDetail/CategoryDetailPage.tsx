import { View } from 'react-native';
import AnimeList from '../../components/feature/animeList/AnimeList';
import { StyleSheet } from 'react-native';
import Anime from '../../models/Anime';
import { useSelector } from 'react-redux';

interface CategoryDetailPageProps {
	category: string;
	navigation: any;
}

export default function CategoryDetailPage({
	category,
	navigation,
}: CategoryDetailPageProps) {
	const animeList = useSelector((state: any) => state.animes.list);

	const filteredList = animeList.filter(
		(anime: Anime) => anime.category == category
	);

	return (
		<View style={styles.page}>
			<View>
				<AnimeList list={filteredList} navigation={navigation} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	page: {
		flex: 1,
		backgroundColor: '#e0e0e0',
	},
});
