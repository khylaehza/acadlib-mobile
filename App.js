import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import Navigation from './Navigation';

export default function App() {
	const [fontsLoaded] = useFonts({
		'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
		'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
		'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
		'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
		'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
		'Montserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}
	return (
		<RootSiblingParent>
			<SafeAreaProvider>
				<GestureHandlerRootView style={{ flex: 1, paddingTop: 40 }}>
					<Navigation />
					<StatusBar style='auto' />
				</GestureHandlerRootView>
			</SafeAreaProvider>
		</RootSiblingParent>
	);
}
