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
import { useForm } from 'react-hook-form';
const ChangePassPage = () => {
	const [drawerVisible, setDrawerVisible] = useState(false);
	const navigation = useNavigation();
	const { curUser, editItem } = useData();
	const toggleDrawer = () => {
		setDrawerVisible(!drawerVisible);
	};
	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();

	const password = watch('password');

	const onChangePress = async (info) => {
		if (curUser.pass == info.curPassword) {
			const updated = { ...curUser, pass: info.password };

			editItem(curUser.key, updated, 'students');

			reset();
		}
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
					<Image
						source={require('../../assets/lock.png')}
						style={{ height: 250, width: 250 }}
					/>
					<CusText
						text={'Change your password here.'}
						type='HEADING'
						font='Montserrat-Bold'
					/>
					<CusInput
						placeholder={'Current Password'}
						name='curPassword'
						control={control}
						rules={{
							required: 'Current Password is required.',
							validate: (value) =>
								value === curUser.pass ||
								'Current password do not match.',
						}}
						secureTextEntry
						type={'password'}
					/>
					<CusInput
						placeholder={'New Password'}
						name='password'
						control={control}
						rules={{
							required: 'New Password is required.',
						}}
						secureTextEntry
						type={'password'}
					/>
					<CusInput
						placeholder={'Confirm Password'}
						name='conpass'
						control={control}
						rules={{
							required: 'Retyping new password is required.',
							validate: (value) =>
								value === password ||
								'New Password do not match.',
						}}
						secureTextEntry
						type={'password'}
					/>
					<CusButton
						text={'CHANGE'}
						onPress={handleSubmit(onChangePress)}
					/>
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
});

export default ChangePassPage;
