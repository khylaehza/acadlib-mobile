import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
	LoginPage,
	RegisterPage,
	HomePage,
	SearchPage,
	BookmarkPage,
	BorrowedPage,
	LibraryIDPage,
	BookPage,
	CurBorrowedPage,
	BorrowedHistoryPage,
	TermsConditionPage,
	ChangePassPage,
} from './src/screens';
import { DataProvider } from './DataContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	Entypo,
	AntDesign,
	Feather,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import { TouchableOpacity, Text, View } from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<DataProvider>
				<Stack.Navigator initialRouteName='Login'>
					<Stack.Screen
						name='Login'
						component={LoginPage}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Register'
						component={RegisterPage}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Homepage'
						component={TabNavigator}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name='IDCard'
						component={LibraryIDPage}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Book'
						component={BookPage}
						options={{ headerShown: false }}
					/>

					<Stack.Screen
						name='Current'
						component={CurBorrowedPage}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='History'
						component={BorrowedHistoryPage}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Password'
						component={ChangePassPage}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name='Terms'
						component={TermsConditionPage}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</DataProvider>
		</NavigationContainer>
	);
};

const TabNavigator = () => {
	const Tab = createBottomTabNavigator();
	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={{ headerShown: false }}
			tabBar={(props) => <MyTabBar {...props} />}
		>
			<Tab.Screen
				name='Home'
				component={HomePage}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<Entypo
							name='home'
							size={17}
							color={color}
						/>
					),
				}}
			/>
			<Tab.Screen
				name='Search'
				component={SearchPage}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<AntDesign
							name='search1'
							size={17}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name='Bookmark'
				component={BookmarkPage}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<Feather
							name='bookmark'
							size={17}
							color={color}
						/>
					),
				}}
			/>

			<Tab.Screen
				name='To Borrow'
				component={BorrowedPage}
				options={{
					labelStyle: { fontSize: 18 },

					tabBarIcon: (color) => (
						<MaterialCommunityIcons
							name='book-alert-outline'
							size={17}
							color={color}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

function MyTabBar({ state, descriptors, navigation }) {
	return (
		<View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
							? options.title
							: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: 'tabPress',
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name, route.params);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: 'tabLongPress',
						target: route.key,
					});
				};

				let color = isFocused ? '#000' : '#D3d3d3';
				return (
					<TouchableOpacity
						accessibilityRole='button'
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						key={index}
						style={{
							flex: 1,
							minHeight: 50,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{options.tabBarIcon(color)}
						<Text
							style={{
								color: isFocused ? '#000' : '#D3d3d3',
								fontFamily: isFocused
									? 'Montserrat-SemiBold'
									: 'Montserrat-Regular',
								fontSize: 12,
							}}
						>
							{label}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

export default Navigation;
