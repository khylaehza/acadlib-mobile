import {
	ScrollView,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useData } from '../../DataContext';
import { CusText, CusSearch, CusDropdown } from '../shared';
import { Ionicons } from '@expo/vector-icons';
import { useForm } from 'react-hook-form';
import { BookLayout, DrawerLayout } from '../layouts';
import { useState } from 'react';
// const SearchPage = () => {
// 	const { books } = useData();
// 	const { control, watch } = useForm({ values: { search: '' } });
// 	const searchVal = watch('search');
// 	const [selectedGenre, setSelectedGenre] = useState(null);

// 	const genres = [
// 		{ label: 'Non-Fiction', value: 'Non-Fiction' },
// 		{ label: 'Academic', value: 'Academic' },
// 		{ label: 'Text Books', value: 'Text Books' },
// 		{ label: 'Manual', value: 'Manual' },
// 	];

// 	const filteredBooks = books?.filter((book) => {
// 		const matchesSearch = book.title
// 			.toLowerCase()
// 			.includes(searchVal.toLowerCase());
// 		const matchesGenre = selectedGenre
// 			? book.genre === selectedGenre
// 			: true;
// 		return matchesSearch && matchesGenre;
// 	});

// 	const [drawerVisible, setDrawerVisible] = useState(false);

// 	const toggleDrawer = () => {
// 		setDrawerVisible(!drawerVisible);
// 	};

// 	return (
// 		<KeyboardAvoidingView style={styles.container}>
// 			<LinearGradient
// 				colors={['#EDFF21', '#00AE1F']}
// 				start={[0, 0]}
// 				end={[0, 1]}
// 				style={styles.container}
// 			>
// 				<View style={styles.header}>
// 					<CusText
// 						text={'Search'}
// 						type={'PRIMARY'}
// 					/>
// 					<TouchableOpacity onPress={() => toggleDrawer()}>
// 						<Ionicons
// 							name='person-circle-outline'
// 							size={24}
// 							color='black'
// 						/>
// 					</TouchableOpacity>
// 				</View>
// 				<ScrollView
// 					contentContainerStyle={styles.scrollContainer}
// 					showsVerticalScrollIndicator={false}
// 				>
// 					<View style={styles.searchAndFilter}>
// 						<CusSearch
// 							name={`search`}
// 							control={control}
// 							placeholder={'Search book title...'}
// 							w='70%'
// 						/>
// 						<CusDropdown
// 							options={genres}
// 							placeholder={'Filter by Genre'}
// 							onSelect={(value) => setSelectedGenre(value)}
// 						/>
// 					</View>

// 					<CusText
// 						text={'Books for all'}
// 						type={'PRIMARY'}
// 						align='left'
// 					/>

// 					<ScrollView
// 						horizontal
// 						showsHorizontalScrollIndicator={false}
// 					>
// 						<View style={{ flexDirection: 'row', gap: 20 }}>
// 							{filteredBooks
// 								?.filter((book) => book?.grade === `For All`)
// 								.map((book, index) => (
// 									<BookLayout
// 										book={book}
// 										key={`all-${index}`}
// 									/>
// 								))}
// 						</View>
// 					</ScrollView>

// 					<CusText
// 						text={'Grade 7'}
// 						type={'PRIMARY'}
// 						align='left'
// 					/>

// 					<ScrollView
// 						horizontal
// 						showsHorizontalScrollIndicator={false}
// 					>
// 						<View style={{ flexDirection: 'row', gap: 20 }}>
// 							{filteredBooks
// 								?.filter((book) => book?.grade === `Grade 7`)
// 								.map((book, index) => (
// 									<BookLayout
// 										book={book}
// 										key={`7-${index}`}
// 									/>
// 								))}
// 						</View>
// 					</ScrollView>

// 					<CusText
// 						text={'Grade 8'}
// 						type={'PRIMARY'}
// 						align='left'
// 					/>
// 					<ScrollView
// 						horizontal
// 						showsHorizontalScrollIndicator={false}
// 					>
// 						<View style={{ flexDirection: 'row', gap: 20 }}>
// 							{filteredBooks
// 								?.filter((book) => book?.grade === `Grade 8`)
// 								.map((book, index) => (
// 									<BookLayout
// 										book={book}
// 										key={`8-${index}`}
// 									/>
// 								))}
// 						</View>
// 					</ScrollView>

// 					<CusText
// 						text={'Grade 9'}
// 						type={'PRIMARY'}
// 						align='left'
// 					/>

// 					<ScrollView
// 						horizontal
// 						showsHorizontalScrollIndicator={false}
// 					>
// 						<View style={{ flexDirection: 'row', gap: 20 }}>
// 							{filteredBooks
// 								?.filter((book) => book?.grade === `Grade 9`)
// 								.map((book, index) => (
// 									<BookLayout
// 										book={book}
// 										key={`9-${index}`}
// 									/>
// 								))}
// 						</View>
// 					</ScrollView>

// 					<CusText
// 						text={'Grade 10'}
// 						type={'PRIMARY'}
// 						align='left'
// 					/>

// 					<ScrollView
// 						horizontal
// 						showsHorizontalScrollIndicator={false}
// 					>
// 						<View style={{ flexDirection: 'row', gap: 20 }}>
// 							{filteredBooks && filteredBooks.length > 0 ? (
// 								filteredBooks
// 									.filter(
// 										(book) => book?.grade === `Grade 10`
// 									)
// 									.map((book, index) => (
// 										<BookLayout
// 											book={book}
// 											key={`10-${index}`}
// 										/>
// 									))
// 							) : (
// 								<CusText
// 									text={'No Available Data'}
// 									font='Montserrat-Regular'
// 								/>
// 							)}
// 						</View>
// 					</ScrollView>
// 				</ScrollView>
// 				{drawerVisible && (
// 					<DrawerLayout
// 						isVisible={drawerVisible}
// 						onClose={toggleDrawer}
// 					/>
// 				)}
// 			</LinearGradient>
// 		</KeyboardAvoidingView>
// 	);
// };

const SearchPage = () => {
	const { books } = useData();
	const { control, watch } = useForm({ values: { search: '' } });
	const searchVal = watch('search');
	const [selectedGenre, setSelectedGenre] = useState('');

	const genres = [
		{ label: 'All', value: '' },
		{ label: 'Non-Fiction', value: 'Non-Fiction' },
		{ label: 'Academic', value: 'Academic' },
		{ label: 'Text Books', value: 'Text Books' },
		{ label: 'Manual', value: 'Manual' },
	];

	const filteredBooks = books?.filter((book) => {
		const matchesSearch = book.title
			?.toLowerCase()
			.includes(searchVal.toLowerCase());
		const matchesGenre = selectedGenre
			? book.genre?.toLowerCase() === selectedGenre.toLowerCase()
			: true;
		return matchesSearch && matchesGenre;
	});

	const [drawerVisible, setDrawerVisible] = useState(false);

	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

	const renderBooks = (grade) => {
		const booksForGrade = filteredBooks?.filter(
			(book) => book?.grade === grade
		);
		return booksForGrade?.length > 0 ? (
			booksForGrade.map((book, index) => (
				<BookLayout
					book={book}
					key={`${grade}-${index}`}
				/>
			))
		) : (
			<CusText
				text={'No Available Data'}
				font='Montserrat-Regular'
			/>
		);
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
						text={'Search'}
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
					<View style={styles.searchAndFilter}>
						<CusSearch
							name={`search`}
							control={control}
							placeholder={'Search book title...'}
							w='70%'
						/>
						<CusDropdown
							options={genres}
							placeholder={'Filter by Genre'}
							onSelect={(value) => setSelectedGenre(value)}
						/>
					</View>

					<CusText
						text={'Books for All'}
						type={'PRIMARY'}
						align='left'
					/>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							{renderBooks('For All')}
						</View>
					</ScrollView>

					<CusText
						text={'Grade 7'}
						type={'PRIMARY'}
						align='left'
					/>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							{renderBooks('Grade 7')}
						</View>
					</ScrollView>

					<CusText
						text={'Grade 8'}
						type={'PRIMARY'}
						align='left'
					/>
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							{renderBooks('Grade 8')}
						</View>
					</ScrollView>

					<CusText
						text={'Grade 9'}
						type={'PRIMARY'}
						align='left'
					/>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							{renderBooks('Grade 9')}
						</View>
					</ScrollView>

					<CusText
						text={'Grade 10'}
						type={'PRIMARY'}
						align='left'
					/>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							{renderBooks('Grade 10')}
						</View>
					</ScrollView>
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
	},
	header: {
		backgroundColor: 'white',
		padding: 20,
		justifyContent: 'space-between',
		display: 'flex',
		flexDirection: 'row',
	},
	bookContainer: {
		marginBottom: 20,
		alignItems: 'center',
	},
	image: {
		width: 100,
		height: 150,
		resizeMode: 'cover',
		borderRadius: 10,
	},
	title: {
		marginTop: 10,
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'Montserrat-Medium',
		color: 'white',
	},
	searchAndFilter: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 1,
	},
});

export default SearchPage;
