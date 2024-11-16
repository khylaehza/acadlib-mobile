import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
	Text,
	TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useData } from '../../DataContext';
import { CusText } from '../shared';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../themes/Color';
import QRCode from 'react-native-qrcode-svg';
import { BookLayout, DrawerLayout } from '../layouts';
import moment from 'moment';

const HomePage = ({ navigation }) => {
	const { books, curUser, borrowed } = useData();

	const [drawerVisible, setDrawerVisible] = useState(false);

	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

	const userBorrowed = borrowed?.filter((b) => b.lrn === curUser?.lrn);

	const overdueCount = userBorrowed?.filter((b) => {
		const endDate = moment(b.edate);
		return endDate.isBefore(moment());
	}).length;

	const nearDueCount = userBorrowed?.filter((b) => {
		const endDate = moment(b.edate);
		const daysUntilDue = endDate.diff(moment(), 'days');
		return daysUntilDue >= 0 && daysUntilDue <= 2;
	}).length;

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
						text={'Home'}
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
					<TouchableOpacity
						style={{
							backgroundColor: 'green',
							height: 180,
							width: 'full',
							borderRadius: 15,
							borderColor: 'green',
							borderWidth: 1,
						}}
						onPress={() => navigation.navigate('IDCard')}
					>
						<View
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignContent: 'center',
								padding: 14,
								height: '100%',
								flexDirection: 'row',
								alignItems: 'center',
								gap: 5,
							}}
						>
							<View
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: '50%',
									height: '100%',
								}}
							>
								<CusText
									text={`Hello, ${curUser?.name}!`}
									color={Colors.primary}
								/>
								<CusText
									text={`You can view your library ID card here.`}
									color={Colors.primary}
									font='Montserrat-Regular'
									size={12}
								/>
							</View>
							<View
								style={{
									display: 'flex',
									alignItems: 'center',
									backgroundColor: 'white',
									justifyContent: 'center',
									borderRadius: 5,
									width: '50%',
									height: '100%',
								}}
							>
								<QRCode
									value={curUser?.lrn}
									size={120}
								/>
							</View>
						</View>
					</TouchableOpacity>
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
								width: '48%',
								borderRadius: 15,
								padding: 8,
							}}
						>
							<CusText
								text={overdueCount}
								type={'PRIMARY'}
								size={20}
							/>
							<CusText
								text={'OVERDUE BORROWED BOOKS'}
								type={'PRIMARY'}
								size={12}
							/>
						</View>

						<View
							style={{
								backgroundColor: 'white',
								height: 80,
								width: '48%',
								borderRadius: 15,
								padding: 8,
							}}
						>
							<CusText
								text={nearDueCount}
								type={'PRIMARY'}
								size={20}
							/>
							<CusText
								text={'NEAR DUE BORROWED BOOKS'}
								type={'PRIMARY'}
								size={12}
							/>
						</View>
					</View>

					<CusText
						text={'Books for you...'}
						type={'PRIMARY'}
						align='left'
					/>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							{books
								?.filter(
									(book) =>
										book?.grade ===
											`Grade ${curUser?.grade}` ||
										book?.grade === `For All`
								)
								.map((book, index) => (
									<BookLayout
										book={book}
										key={`user-${index}`}
									/>
								))}
						</View>
					</ScrollView>

					<CusText
						text={'New added books...'}
						type={'PRIMARY'}
						align='left'
					/>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
					>
						<View style={{ flexDirection: 'row', gap: 20 }}>
							{books?.map((book, index) => (
								<BookLayout
									book={book}
									key={`new-${index}`}
								/>
							))}
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
});

export default HomePage;
