import React, { useState } from 'react';
import {
	View,
	Text,
	Image,
	Animated,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useData } from '../../DataContext';
import { CusAccordion, CusButton } from '../shared';
import { useNavigation } from '@react-navigation/native';
const DrawerLayout = ({ isVisible, onClose }) => {
	const { curUser, setCurUser } = useData();
	const navigation = useNavigation();
	const [animation] = useState(
		new Animated.Value(Dimensions.get('window').width)
	);

	React.useEffect(() => {
		Animated.timing(animation, {
			toValue: isVisible ? 0 : Dimensions.get('window').width,
			duration: 300,
			useNativeDriver: true,
		}).start();
	}, [isVisible]);

	return (
		<Animated.View
			style={[styles.drawer, { transform: [{ translateX: animation }] }]}
		>
			<View style={styles.content}>
				<View style={{ flexDirection: 'row', padding: 14 }}>
					<View
						style={{
							alignContent: 'flex-start',
							alignItems: 'center',
							justifyContent: 'flex-start',
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							gap: 10,
						}}
					>
						<Image
							source={
								curUser?.image
									? { uri: curUser?.image }
									: require('../../assets/icon.jpg')
							}
							style={{ height: 50, width: 50, borderRadius: 100 }}
						/>
						<View>
							<Text
								style={{
									fontFamily: 'Montserrat-SemiBold',
									color: 'white',
								}}
							>
								{curUser?.name}
							</Text>
							<Text
								style={{
									fontFamily: 'Montserrat-Regular',
									color: 'white',
								}}
							>
								{curUser?.lrn}
							</Text>
						</View>
					</View>
					<TouchableOpacity
						style={{ marginTop: 5 }}
						onPress={onClose}
					>
						<MaterialIcons
							name='close'
							size={24}
							color='white'
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						width: '100%',
						borderColor: '#fff',
						borderWidth: 1,
					}}
				/>
				<View style={styles.acccontainer}>
					<CusAccordion title='Account Information'>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Password');
								onClose();
							}}
						>
							<Text style={styles.contentText}>
								Change Password
							</Text>
						</TouchableOpacity>
					</CusAccordion>
					<CusAccordion title='Books'>
						<View style={{ display: 'flex', gap: 20 }}>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('Current');
									onClose();
								}}
							>
								<Text style={styles.contentText}>
									Currently Borrowed
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => {
									navigation.navigate('History');
									onClose();
								}}
							>
								<Text style={styles.contentText}>
									Borrowing History
								</Text>
							</TouchableOpacity>
						</View>
					</CusAccordion>
					<CusAccordion title='Others'>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('General');
								onClose();
							}}
						>
							<Text style={styles.contentText}>
								General Policy
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Terms');
								onClose();
							}}
						>
							<Text style={styles.contentText}>
								Borrowing and Returning Policy
							</Text>
						</TouchableOpacity>
					</CusAccordion>
				</View>
				<CusButton
					text={'Logout'}
					onPress={() => {
						setCurUser();
						navigation.navigate('Login');
					}}
				/>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	acccontainer: {
		flex: 1,
		padding: 10,
		width: '100%',
	},
	drawer: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		width: '70%',
		backgroundColor: 'rgba(59, 155, 35, 1)',
		elevation: 5,
	},
	content: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		gap: 15,
	},
	closeTouchableOpacity: {
		position: 'absolute',
		top: 20,
		right: 20,
		zIndex: 1,
	},
	drawerText: {
		fontSize: 18,
		marginBottom: 20,
		color: 'white',
	},
	contentText: {
		fontSize: 14,
		color: '#fff',
		fontFamily: 'Montserrat-Medium',
		padding: 10,
	},
});

export default DrawerLayout;
