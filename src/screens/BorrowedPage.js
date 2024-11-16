import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CusText } from '../shared';
import { Ionicons } from '@expo/vector-icons';
import { useData } from '../../DataContext';
import { BookLayout, DrawerLayout } from '../layouts';
import { useState } from 'react';
const BorrowedPage = () => {
	const { toBorrow, curUser, books } = useData();

	const userToBorrow = toBorrow?.filter(
		(b) =>
			b.lrn === curUser?.lrn && books?.some((book) => book.key === b.key)
	);
	const [drawerVisible, setDrawerVisible] = useState(false);

	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

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
						text={'To Borrow'}
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
						{userToBorrow.length == 0 && (
							<CusText text={'No data available.'} />
						)}

						{Array.from(
							{ length: Math.ceil(userToBorrow.length / 3) },
							(_, rowIndex) => (
								<View
									style={{ flexDirection: 'row', gap: 10 }}
									key={`row-${rowIndex}`}
								>
									{userToBorrow
										.slice(rowIndex * 3, rowIndex * 3 + 3)
										.map((book, index) => (
											<BookLayout
												book={book}
												key={`toborrow-${rowIndex * 3 + index}`}
												style={{ flex: 1 }}
											/>
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

export default BorrowedPage;
