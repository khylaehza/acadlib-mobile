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
						text={'Terms and Condition'}
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
						1. Acceptance of Terms
					</Text>
					<Text style={styles.sectionText}>
						By accessing and using the AcadLib mobile library
						application (hereafter referred to as "the
						Application"), you agree to comply with and be bound by
						these Terms and Conditions. If you do not agree to these
						terms, you must not use the Application.
					</Text>
					<Text style={styles.sectionTitle}>2. User Eligibility</Text>
					<Text style={styles.sectionText}>
						The Application is intended for use by registered
						students and librarians of Malabon National High School.
						By using the Application, you confirm that you meet this
						eligibility requirement. Unauthorized use is strictly
						prohibited.
					</Text>
					<Text style={styles.sectionTitle}>
						3. User Registration
					</Text>
					<Text style={styles.sectionText}>
						To access certain features of the Application, users
						must register by providing accurate and complete
						information. Users are responsible for maintaining the
						confidentiality of their login credentials and for all
						activities that occur under their account. Users must
						notify the librarian immediately of any unauthorized use
						of their account.
					</Text>
					<Text style={styles.sectionTitle}>
						4. Use of the Application
					</Text>
					<Text style={styles.sectionText}>
						Users may use the Application for the following
						purposes: {'\n'}- To search for, borrow, and return
						library books. {'\n'}- To manage user profiles and
						monitor borrowing history. {'\n'}- To access educational
						materials and library resources. {'\n'}
						Any other use of the Application, including but not
						limited to unauthorized access, data mining, or other
						forms of exploitation, is strictly prohibited.
					</Text>
					<Text style={styles.sectionTitle}>
						5. QR Code Technology
					</Text>
					<Text style={styles.sectionText}>
						The Application utilizes QR code technology for
						borrowing and inventory management. Users must ensure
						that their devices can scan QR codes effectively. The
						library is not responsible for any issues arising from
						users' devices or their inability to use the QR code
						feature.
					</Text>
					<Text style={styles.sectionTitle}>
						6. Borrowing and Returning Books
					</Text>
					<Text style={styles.sectionText}>
						Books must be borrowed and returned in accordance with
						the guidelines set forth in the Application. Users are
						responsible for the care of borrowed books and must
						return them in good condition. If a book is lost or
						damaged, the user must replace it with the same title or
						a similar book as determined by the librarian.
					</Text>
					<Text style={styles.sectionTitle}>
						7. Data Privacy and Security
					</Text>
					<Text style={styles.sectionText}>
						We are committed to protecting your privacy. The
						personal information collected through the Application
						will be used solely for the purposes of library
						management and will not be shared with third parties
						without the user's consent, except as required by law.
					</Text>
					<Text style={styles.sectionTitle}>
						8. Limitation of Liability
					</Text>
					<Text style={styles.sectionText}>
						The Application is provided on an "as is" and "as
						available" basis. Malabon National High School and the
						developers of the Application shall not be liable for
						any direct, indirect, incidental, or consequential
						damages arising from the use or inability to use the
						Application, even if advised of the possibility of such
						damages.
					</Text>
					<Text style={styles.sectionTitle}>
						9. Modifications to Terms
					</Text>
					<Text style={styles.sectionText}>
						Malabon National High School reserves the right to
						modify these Terms and Conditions at any time. Changes
						will be effective immediately upon posting on the
						Application. Continued use of the Application after
						changes are made constitutes acceptance of the new
						terms.
					</Text>
					<Text style={styles.sectionTitle}>
						10. Contact Information
					</Text>
					<Text style={styles.sectionText}>
						For questions or concerns regarding these Terms and
						Conditions, please contact the librarian at Malabon
						National High School.
					</Text>
					<Text style={styles.agreementText}>
						By using the AcadLib Application, you acknowledge that
						you have read, understood, and agree to be bound by
						these Terms and Conditions.
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
