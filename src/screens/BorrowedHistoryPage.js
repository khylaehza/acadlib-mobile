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
import { DrawerLayout } from '../layouts';
import { useState } from 'react';
import { CusText, CusInput, CusButton } from '../shared';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
const BorrowedHistoryPage = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const navigation = useNavigation();
	const { curUser, history } = useData();
	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};

	const userHistory = history?.filter((b) => b.lrn === curUser?.lrn);

	console.log(userHistory);
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
						text={'Borrowing History'}
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
					{userHistory.length == 0 && (
						<CusText text={'No data available.'} />
					)}

					<View style={{ width: '100%', display: 'flex' }}>
						{userHistory.map((historyItem, index) => {
							const bookName =
								historyItem?.title || 'Unknown Book';
							const startDate = moment(historyItem?.sdate).format(
								'MMM D, YYYY'
							);
							const endDate = moment(historyItem?.edate).format(
								'MMM D, YYYY'
							);
							const returnDate = historyItem?.rdate
								? moment(historyItem?.rdate).format(
										'MMM D, YYYY'
									)
								: 'Not Returned Yet';

							return (
								<View
									key={index}
									style={{
										flexDirection: 'column',
										justifyContent: 'space-between',
										alignItems: 'center',
										paddingVertical: 8,
										borderBottomWidth:
											index !== userHistory.length - 1
												? 1
												: 0,
										borderBottomColor: 'rgba(0, 0, 0, 0.2)',
									}}
								>
									<CusText
										text={bookName}
										style={{
											flex: 1,
											fontWeight: 'bold',
										}}
									/>

									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											gap: 5,
										}}
									>
										<CusText
											text='Start Borrowed Date: '
											font='Montserrat-Regular'
										/>
										<CusText
											text={startDate}
											font='Montserrat-Regular'
										/>
									</View>

									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											gap: 5,
										}}
									>
										<CusText
											text='End Borrowed Date: '
											font='Montserrat-Regular'
										/>
										<CusText
											text={endDate}
											font='Montserrat-Regular'
										/>
									</View>

									<View
										style={{
											display: 'flex',
											flexDirection: 'row',
											gap: 5,
										}}
									>
										<CusText
											text='Returned Date: '
											font='Montserrat-Regular'
										/>
										<CusText
											text={returnDate}
											font='Montserrat-Regular'
										/>
									</View>
								</View>
							);
						})}
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

export default BorrowedHistoryPage;
