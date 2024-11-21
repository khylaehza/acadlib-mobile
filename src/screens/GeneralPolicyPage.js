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
const GeneralPolicyPage = () => {
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
					<Text style={styles.sectionTitle}>GENERAL POLICY</Text>
					<Text style={styles.sectionText}>
						TO ENSURE THE SAFETY USE OF THE MNHS LIBRARY, THE
						FOLLOWING MUST BE FOLLOWED:
					</Text>
					<Text style={styles.sectionText}>
						• Open Monday – Friday 6:00 am to 5:00 pm, except
						Saturday, Sunday, and Holidays
					</Text>
					<Text style={styles.sectionText}>
						• Leave your bag upon entering. Secure with you or
						valuables (cellphone, wallet, etc.)
					</Text>
					<Text style={styles.sectionText}>
						• Always register on the designated log book.
					</Text>
					<Text style={styles.sectionText}>
						• Eating is not allowed. Drinking water is allowed,
						except other beverages like soft drinks, milk tea, and
						the like.
					</Text>
					<Text style={styles.sectionText}>
						• Vandalism, mutilating, and stealing library property
						is prohibited.
					</Text>
					<Text style={styles.sectionText}>
						• Maintain cleanliness and proper arrangement of tables
						and chairs after use.
					</Text>
					<Text style={styles.sectionText}>
						• Modulate your voice when talking to give respect to
						other library users.
					</Text>
					<Text style={styles.sectionText}>
						• Book/s read inside the library must return to the
						Return Book Area.
					</Text>
					<Text style={styles.sectionText}>
						• A public display of affection, disrespectful language,
						and/or gestures against library personnel or in
						authority will be dealt accordingly.
					</Text>
					<Text style={styles.sectionText}>
						• Violators shall be asked to leave the premises.
					</Text>
					<Text style={styles.sectionText}>
						First Offense – Verbal Warning
					</Text>
					<Text style={styles.sectionText}>
						Second Offense – Report to SSG for Disciplinary Action.
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

export default GeneralPolicyPage;
