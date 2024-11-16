import React from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useData } from '../../DataContext';
import { DrawerLayout, BookLayout } from '../layouts';
import { useState } from 'react';
import { CusText, CusInput, CusButton } from '../shared';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const CurBorrowedPage = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const navigation = useNavigation();
	const { curUser, books, borrowed } = useData();
	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

	const matchingBooks = books
		.map((book) => {
			const borrowedItem = borrowed.find(
				(item) => item.cn === book.cn && item.lrn === curUser.lrn
			);

			if (borrowedItem) {
				return {
					...book,
					sdate: borrowedItem.sdate,
					edate: borrowedItem.edate,
				};
			}
			return null;
		})
		.filter((book) => book !== null);

	return (
		<KeyboardAvoidingView style={styles.container}>
			<LinearGradient
				colors={['#EDFF21', '#00AE1F']}
				start={[0, 0]}
				end={[0, 1]}
				style={styles.container}
			>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
							setDrawerVisible(false);
						}}
					>
						<Entypo
							name='chevron-thin-left'
							size={18}
							color='black'
						/>
					</TouchableOpacity>
					<CusText
						text={'Currently Borrowed'}
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
					{matchingBooks.length == 0 && (
						<CusText text={'No data available.'} />
					)}

					<View
						style={{
							flexDirection: 'column',
							flexWrap: 'wrap',
							width: '100%',
						}}
					>
						{matchingBooks
							.reduce((rows, book, index) => {
								if (index % 3 === 0) rows.push([]);
								rows[rows.length - 1].push(book);
								return rows;
							}, [])
							.map((row, rowIndex) => (
								<View
									style={{
										flexDirection: 'row',

										marginBottom: 16,
									}}
									key={`row-${rowIndex}`}
								>
									{row.map((book, colIndex) => (
										<View
											style={{ width: '32%' }}
											key={`brrwd-${rowIndex}-${colIndex}`}
										>
											<BookLayout
												book={book}
												borrowed={true}
											/>
										</View>
									))}
								</View>
							))}
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
		// justifyContent: 'space-between',
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

export default CurBorrowedPage;
