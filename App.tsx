import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import HomePage from './pages/home/HomePage';
import FavoriteAnimeListPage from './pages/favoriteAnimeListPage/FavoriteAnimeListPage';
import AnimeDetaiPage from './pages/animeDetail/AnimeDetaiPage';

import { store } from './store/store';

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

export default function App() {
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
