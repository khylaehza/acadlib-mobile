import React from 'react';
import {
	ScrollView,
	View,
	StyleSheet,
	TouchableOpacity,
	KeyboardAvoidingView,
	Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useData } from '../../DataContext';
import { DrawerLayout } from '../layouts';
import { useState } from 'react';
import { CusText, CusInput, CusButton } from '../shared';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const TermsConditionPage = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const navigation = useNavigation();
	const { curUser, editItem } = useData();
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
						text={'Borrowing and Returning Policy'}
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
					<Text style={styles.sectionTitle}>
						BORROWING AND RETURNING POLICY
					</Text>
					<Text style={styles.sectionText}>
						• Students may borrow 2 books at a time for 1 week.
						Teachers/Admin may borrow a maximum of 10 books at a
						time for 1 month.
					</Text>
					<Text style={styles.sectionText}>
						• No ID, No library card, No borrowing policy.
					</Text>
					<Text style={styles.sectionText}>
						• Fill in the book card properly.
					</Text>
					<Text style={styles.sectionText}>To return the books:</Text>
					<Text style={styles.sectionText}>
						- Simply present the borrower’s card for counter
						checking and signing by the librarian.
					</Text>
					<Text style={styles.sectionText}>
						- Be sure that the borrower’s card is countersigned
						before leaving the library.
					</Text>
					<Text style={styles.sectionText}>
						• Upon leaving the library, present the book/s borrowed
						to the person assigned at the exit door.
					</Text>
					<Text style={styles.sectionText}>
						• Students/Teachers/Admin with unreturned overdue books
						are not allowed to borrow other books until the
						obligation is settled.
					</Text>
					<Text style={styles.sectionText}>
						• Lost or damaged library materials must be reported
						immediately to the library staff.
					</Text>
					<Text style={styles.sectionText}>
						• Lost or damaged library materials must be replaced
						with the same title, author, copyright, subject, value,
						or function.
					</Text>
					<Text style={styles.sectionText}>
						• Users may renew their borrowed library materials if
						the materials are not in demand.
					</Text>
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
	heading: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 16,

		marginTop: 10,
		fontFamily: 'Montserrat-SemiBold',
	},
	sectionText: {
		fontSize: 14,
		marginTop: 5,
		lineHeight: 20,
		fontFamily: 'Montserrat-Regular',
	},
	agreementText: {
		fontSize: 14,
		marginTop: 15,
		fontFamily: 'Montserrat-Italic',
		textAlign: 'center',
	},
});

export default TermsConditionPage;
