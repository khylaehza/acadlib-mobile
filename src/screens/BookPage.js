import React from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CusText } from '../shared';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CusButton } from '../shared';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useData } from '../../DataContext';
import { useState } from 'react';
import moment from 'moment';
const BookPage = ({ route }) => {
	const navigation = useNavigation();
	const { book, userBorrowed } = route.params;

	const { addItem, bookmarks, curUser, toBorrow, deleteItem, borrowed } =
		useData();

	const [isToBorrowed, setIsToBorrowed] = useState(
		toBorrow?.some((b) => b.key === book?.key && b.lrn === curUser?.lrn)
	);

	const isBorrowed = borrowed?.some(
		(b) => b.cn === book?.cn && b.lrn === curUser?.lrn
	);

	const [isBookmarked, setIsBookmarked] = useState(
		bookmarks?.some((b) => b.key === book?.key && b.lrn === curUser?.lrn)
	);

	const overdueCount = userBorrowed?.filter((b) => {
		const endDate = moment(b.edate);
		return endDate.isBefore(moment());
	}).length;

	const onBookmarkPress = (data) => {
		const bookmarkData = { ...data, lrn: curUser?.lrn };
		addItem(bookmarkData, 'bookmarks');
		setIsBookmarked(true);
	};

	const onBorrowPress = (data) => {
		const toBorrowData = { ...data, lrn: curUser?.lrn };
		addItem(toBorrowData, 'to-borrow');
		setIsToBorrowed(true);
	};

	const onRemoveBorrowPress = () => {
		const borrowBook = toBorrow?.find(
			(b) => b.key === book?.key && b.lrn === curUser?.lrn
		);
		deleteItem(borrowBook.borrowKey, 'to-borrow');
		setIsToBorrowed(false);
	};

	const onRemoveBookmarkPress = () => {
		const markBook = bookmarks?.find(
			(b) => b.key === book?.key && b.lrn === curUser?.lrn
		);

		deleteItem(markBook.markKey, 'bookmarks');
		setIsBookmarked(false);
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<LinearGradient
				colors={['#EDFF21', '#00AE1F']}
				start={[0, 0]}
				end={[0, 1]}
				style={styles.container}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContainer}
					showsVerticalScrollIndicator={false}
				>
					<Ionicons
						name='chevron-back'
						size={24}
						color='black'
						onPress={() => navigation.goBack()}
					/>
					<View
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 20,
						}}
					>
						<Image
							source={{ uri: book?.image }}
							style={styles.image}
						/>
						<CusText
							text={book?.title}
							size={24}
							font='Montserrat-Bold'
						/>
						<View
							style={{
								width: '100%',
								padding: 16,
							}}
						>
							{[
								{ label: 'Author', value: book?.author },
								{ label: 'Date Published', value: book?.date },
								{ label: 'Edition', value: book?.edition },
								{ label: 'Volume', value: book?.vol },
								{ label: 'Pages', value: book?.page },
								{ label: 'Quantity', value: book?.qty },
								{ label: 'Publisher', value: book?.publisher },
								{ label: 'Genre', value: book?.genre },
								{ label: 'ISBN', value: book?.isbn },
							].map((item, index) => (
								<View
									key={index}
									style={{
										flexDirection: 'row',
										justifyContent: 'space-between',
										alignItems: 'center',
										paddingVertical: 8,
										borderBottomWidth: index !== 8 ? 1 : 0,
										borderBottomColor: 'rgba(0, 0, 0, 0.2)',
									}}
								>
									<CusText
										text={item.label}
										style={{
											width: '40%',
											fontWeight: 'bold',
										}}
									/>
									<CusText
										text={item.value}
										style={{
											width: '50%',
											textAlign: 'right',
										}}
									/>
								</View>
							))}
						</View>
						{book?.sdate || book?.edate ? (
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									width: '100%',
									justifyContent: 'space-between',
								}}
							>
								<View
									style={{
										backgroundColor: 'white',
										height: 80,
										width: '33%',
										borderRadius: 15,
										padding: 8,
										justifyContent: 'center',
										display: 'flex',
									}}
								>
									<CusText
										text={moment(book?.sdate).format(
											'MMM D, YYYY'
										)}
										type={'PRIMARY'}
										size={14}
									/>
									<CusText
										text={'BORROWED DATE START'}
										type={'PRIMARY'}
										size={10}
									/>
								</View>

								<View
									style={{
										backgroundColor: 'white',
										height: 80,
										width: '33%',
										borderRadius: 15,
										padding: 8,
										justifyContent: 'center',
										display: 'flex',
									}}
								>
									<CusText
										text={moment(book?.edate).diff(
											moment(book?.sdate),
											'days'
										)}
										type={'PRIMARY'}
										size={22}
									/>
									<CusText
										text={'BORROW REMAINING DAYS'}
										type={'PRIMARY'}
										size={10}
									/>
								</View>

								<View
									style={{
										backgroundColor: 'white',
										height: 80,
										width: '33%',
										borderRadius: 15,
										padding: 8,
										justifyContent: 'center',
										display: 'flex',
									}}
								>
									<CusText
										text={moment(book?.edate).format(
											'MMM D, YYYY'
										)}
										type={'PRIMARY'}
										size={14}
									/>
									<CusText
										text={'BORROWED DATE END'}
										type={'PRIMARY'}
										size={10}
									/>
								</View>
							</View>
						) : (
							<View
								style={{
									display: 'flex',
									flexDirection: 'row',
									width: '100%',
									gap: 5,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<CusButton
									type='PRIMARY'
									text={isToBorrowed ? 'UNBORROW' : 'BORROW'}
									width={'80%'}
									onPress={() =>
										isToBorrowed
											? onRemoveBorrowPress()
											: onBorrowPress(book)
									}
									disabled={isToBorrowed}
									disable={
										overdueCount?.length > 0 || isBorrowed
									}
								/>

								<TouchableOpacity
									style={{
										backgroundColor: isBookmarked
											? 'red'
											: 'white',
										width: '100%',
										padding: 8,
										borderRadius: 5,
										opacity: isBookmarked ? 0.7 : 1,
									}}
									onPress={() =>
										isBookmarked
											? onRemoveBookmarkPress()
											: onBookmarkPress(book)
									}
								>
									{isBookmarked ? (
										<MaterialCommunityIcons
											name='bookmark-remove-outline'
											size={32}
											color={'white'}
										/>
									) : (
										<Feather
											name='bookmark'
											size={32}
											color={'black'}
										/>
									)}
								</TouchableOpacity>
							</View>
						)}
					</View>
				</ScrollView>
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
		gap: 20,
	},
	image: {
		width: 150,
		height: 200,
		resizeMode: 'cover',
		borderRadius: 10,
		borderWidth: 2,
		borderColor: 'black',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	divider: {
		width: 1,
		height: '100%',
		backgroundColor: '#000',
	},
});

export default BookPage;
