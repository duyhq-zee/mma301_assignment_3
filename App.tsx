import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import HomePage from './pages/home/HomePage';
import FavoriteAnimeListPage from './pages/favoriteAnimeListPage/FavoriteAnimeListPage';
import AnimeDetaiPage from './pages/animeDetail/AnimeDetaiPage';

import { store } from './store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="Home"
				component={HomePage}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home" color={color} size={size} />
					),
				}}
			/>
			<BottomTab.Screen
				name="FavoriteAnimeListPage"
				component={FavoriteAnimeListPage}
				options={{
					title: 'Favorites',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="heart" color={color} size={size} />
					),
					tabBarLabel: 'Favorites',
				}}
			/>
		</BottomTab.Navigator>
	);
};

const mockData = async () => {
	await AsyncStorage.removeItem('animeList');

	const animeList = [
		{
			name: 'Attack on Titan',
			id: 'f0ac54a4-3e80-4d77-9e8b-54d85d2d34c1',
			imageUrl:
				'https://static.wikia.nocookie.net/shingekinokyojin/images/d/d8/Attack_on_Titan_Season_1.jpg/revision/latest?cb=20211005182832',
			description:
				"Attack on Titan (Japanese: 進撃の巨人, Hepburn: Shingeki no Kyojin, lit. 'The Advancing Giant') is a Japanese manga series written and illustrated by Hajime Isayama. It is set in a world where humanity is forced to live in cities surrounded by three enormous walls that protect them from gigantic man-eating humanoids referred to as Titans; the story follows Eren Yeager, who vows to exterminate the Titans after they bring about the destruction of his hometown and the death of his mother. It was serialized in Kodansha's monthly magazine Bessatsu Shōnen Magazine from September 2009 to April 2021, with its chapters collected in 34 tankōbon volumes.",
		},
		{
			name: 'Naruto',
			id: '34993b7e-2e35-497a-ae39-f3b4c3f90b6f',
			imageUrl:
				'https://pbs.twimg.com/media/EJ1FQbEUcAAg7C0?format=jpg&name=4096x4096',
			description:
				"Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, a young ninja who seeks recognition from his peers and dreams of becoming the Hokage, the leader of his village. The story is told in two parts—the first set in Naruto's pre-teen years, and the second in his teens. The series is based on two one-shot manga by Kishimoto: Karakuri (1995), which earned Kishimoto an honorable mention in Shueisha's monthly Hop Step Award the following year, and Naruto (1997).",
		},
		{
			name: 'One Piece',
			id: '7f0a3e4e-7f0c-4dc4-855d-8e3f900d463e',
			imageUrl:
				'https://i.pinimg.com/originals/a0/e7/84/a0e7845832279a1315e9d98624bff6de.jpg',
			description:
				'One Piece (stylized in all caps) is a Japanese manga series written and illustrated by Eiichiro Oda. It has been serialized in Shueisha\'s shōnen manga magazine Weekly Shōnen Jump since July 1997, with its individual chapters compiled into 105 tankōbon volumes as of March 2023. The story follows the adventures of Monkey D. Luffy and his crew, the Straw Hat Pirates, where he explores the Grand Line in search of the mythical treasure known as the "One Piece" in order to become the next King of the Pirates.',
		},
		{
			name: 'Demon Slayer',
			id: 'b8c89d3a-9ff4-4959-b699-aa54e6fe4e96',
			imageUrl:
				'https://demonslayer-hinokami.sega.com/img/purchase/digital-standard.jpg',
			description:
				'Demon Slayer: Kimetsu no Yaiba (鬼滅の刃, Kimetsu no Yaiba, "Blade of Demon Destruction") is a Japanese manga series written and illustrated by Koyoharu Gotouge. It was serialized in Shueisha\'s shōnen manga magazine Weekly Shōnen Jump from February 2016 to May 2020, with its chapters collected in 23 tankōbon volumes. It has been published in English by Viz Media and simultaneously published by Shueisha on their Manga Plus platform. It follows teenage Tanjiro Kamado, who strives to become a Demon Slayer after his family was slaughtered and his younger sister, Nezuko, turned into a demon.',
		},
		{
			name: 'My Hero Academia',
			id: 'f5b82e63-84f1-4f73-b0e1-1d32e8c997e5',
			imageUrl:
				'https://i.ex-cdn.com/mgn.vn/files/news/2022/07/24/4-diem-lam-nen-ten-tuoi-cua-anime-my-hero-academia-164859.jpg',
			description:
				'My Hero Academia (Japanese: 僕のヒーローアカデミア, Hepburn: Boku no Hīrō Akademia) is a Japanese superhero manga series written and illustrated by Kōhei Horikoshi. It has been serialized in Shueisha\'s shōnen manga magazine Weekly Shōnen Jump since July 2014, with its chapters additionally collected into 38 tankōbon volumes as of June 2023. Set in a world where superpowers (called "Quirks") have become commonplace, the story follows Izuku Midoriya, a boy who was born without a Quirk but still dreams of becoming a superhero himself. He is scouted by the world\'s greatest hero, All Might, who bestows his Quirk to Midoriya after recognizing his potential, and helps to enroll him in a prestigious high school for superheroes in training.',
		},
		{
			name: 'Fullmetal Alchemist: Brotherhood',
			id: '5a8c5321-6e96-4dca-8e24-cc5738ef6b4e',
			imageUrl:
				'https://wallpapers.com/images/featured/fullmetal-alchemist-brotherhood-0tvvnvos36llm4yx.jpg',
			description:
				"Fullmetal Alchemist: Brotherhood (Japanese: 鋼の錬金術師 FULLMETAL ALCHEMIST, Hepburn: Hagane no Renkinjutsushi) is a Japanese anime television series adapted from the original Fullmetal Alchemist manga series by Hiromu Arakawa. Produced by Bones, the series is directed by Yasuhiro Irie, written by Hiroshi Ōnogi and composed by Akira Senju. The series was conceived in order to create a faithful adaptation that directly follows the entire storyline of the original manga, after 2003's Fullmetal Alchemist anime series strayed away from it to tell its own story after running out of published manga material to adapt.",
		},
		{
			name: 'Death Note',
			id: '65adcb33-91ff-40f0-b4a1-0e4b2c298a28',
			imageUrl:
				'https://i.kym-cdn.com/entries/icons/original/000/008/610/deathnote-1280-1490294885083_1280w.jpg',
			description:
				'Death Note (stylized in all caps) is a Japanese manga series written by Tsugumi Ohba and illustrated by Takeshi Obata. It was serialized in Shueisha\'s shōnen manga magazine Weekly Shōnen Jump from December 2003 to May 2006, with its chapters collected in 12 tankōbon volumes. The story follows Light Yagami, a genius who discovers a mysterious notebook: the "Death Note", which belonged to the shinigami Ryuk, and grants the user the supernatural ability to kill anyone whose name is written in its pages. The series centers around Light\'s subsequent attempts to use the Death Note to carry out a worldwide massacre of individuals whom he deems immoral and to create a crime-free society, using the alias of a god-like vigilante named "Kira", and the subsequent efforts of an elite Japanese police task force, led by enigmatic detective L, to apprehend him.',
		},
		{
			name: 'Dragon Ball Z',
			id: 'd44105f9-5c2e-4baf-99a9-2d3b6725e2c8',
			imageUrl:
				'https://www.themarysue.com/wp-content/uploads/2018/09/Dragon-Ball-Z-03152018.jpg?fit=1200%2C674',
			description:
				'Dragon Ball Z is a Japanese anime television series produced by Toei Animation. Part of the Dragon Ball media franchise, it is the sequel to the 1986 Dragon Ball anime series and adapts the latter 325 chapters of the original Dragon Ball manga series created by Akira Toriyama. The series aired in Japan on Fuji TV from April 1989 to January 1996 and was later dubbed for broadcast in at least 81 countries worldwide.',
		},
		{
			name: 'Hunter x Hunter',
			id: '9868ad1c-2fb9-40e2-b0ff-ae67d7f83d41',
			imageUrl:
				'https://staticg.sportskeeda.com/editor/2022/05/504ea-16535021450398-1920.jpg',
			description:
				'Hunter × Hunter is an anime television series that aired from 2011 to 2014 based on Yoshihiro Togashi\'s manga series Hunter × Hunter. The story begins with a young boy named Gon Freecss, who one day discovers that the father who he thought was dead, is in fact alive and well. He learns that his father, Ging, is a legendary "Hunter", an individual who has proven themselves an elite member of humanity. Despite the fact that Ging left his son with his relatives in order to pursue his own dreams, Gon becomes determined to follow in his father\'s footsteps, pass the rigorous "Hunter Examinatio", and eventually find his father to become a Hunter in his own right.',
		},
		{
			name: 'One Punch Man',
			id: '5e6b3fb2-7265-46db-9865-928f3486b2c5',
			imageUrl:
				'https://sm.ign.com/ign_nordic/cover/o/one-punch-/one-punch-man-a-hero-nobody-knows_gmcv.jpg',
			description:
				'One-Punch Man is a Japanese anime series based on the webcomic created by One and its subsequent manga adaptation illustrated by Yusuke Murata. The series was directed by Shingo Natsume at Madhouse and was written by Tomohiro Suzuki. The series also features character design by Chikashi Kubota, who also served as chief animation director, and music by Makoto Miyazaki. The series aired from October 5 to December 21, 2015 and was simulcast by Daisuki and Hulu.',
		},
	];

	await AsyncStorage.setItem('animeList', JSON.stringify(animeList));
};

const clearFavoriteList = async () => {
	await AsyncStorage.removeItem('favoriteAnimeIdList');
};

export default function App() {
	useEffect(() => {
		// clearFavoriteList();
		mockData();
	}, []);

	return (
		<>
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="HomeNavigator"
							component={HomeNavigator}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name="AnimeDetail" component={AnimeDetaiPage} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
}
