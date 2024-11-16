import {
	ScrollView,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CusText } from '../shared';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../DataContext';
import { BookLayout, DrawerLayout } from '../layouts';
import { useState } from 'react';

const BookmarkPage = () => {
	const { bookmarks, curUser, books } = useData();
	const [drawerVisible, setDrawerVisible] = useState(false);

	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};
	const userBookmarks = bookmarks?.filter(
		(b) =>
			b.lrn === curUser?.lrn && books?.some((book) => book.key === b.key)
	);

	return (
		<KeyboardAvoidingView style={styles.container}>
			<LinearGradient
				colors={['#EDFF21', '#00AE1F']}
				start={[0, 0]}
				end={[0, 1]}
				style={styles.container}
			>
				<View style={styles.header}>
					<CusText
						text={'Bookmark'}
						type={'PRIMARY'}
					/>
					<TouchableOpacity onPress={() => toggleDrawer()}>
						<Ionicons
							name='person-circle-outline'
							size={24}
							color='black'
						/>
					</TouchableOpacity>
				</View>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
				>
					<View
						style={{
							flexDirection: 'column',
							gap: 20,
							alignContent: 'left',
							width: '100%',
						}}
					>
						{userBookmarks.length == 0 && (
							<CusText text={'No data available.'} />
						)}
						{Array.from(
							{ length: Math.ceil(userBookmarks.length / 3) },
							(_, rowIndex) => (
								<View
									style={{ flexDirection: 'row', gap: 10 }}
									key={`r-${rowIndex}`}
								>
									{userBookmarks
										.slice(rowIndex * 3, rowIndex * 3 + 3)
										.map((book, index) => (
											<View
												style={{
													flexDirection: 'column',
													alignItems: 'center',
												}}
												key={`bm-${rowIndex * 3 + index}`}
											>
												<BookLayout
													book={book}
													style={{ flex: 1 }}
												/>
											</View>
										))}
								</View>
							)
						)}
					</View>
				</ScrollView>
				{drawerVisible && (
					<DrawerLayout
						isVisible={drawerVisible}
						onClose={toggleDrawer}
					/>
				)}
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		padding: 25,
		justifyContent: 'space-between',
		gap: 20,
		alignItems: 'center',
	},
	header: {
		backgroundColor: 'white',
		padding: 20,
		justifyContent: 'space-between',
		display: 'flex',
		flexDirection: 'row',
	},
});

export default BookmarkPage;
