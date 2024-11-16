import { LinearGradient } from 'expo-linear-gradient';
import {
	StyleSheet,
	KeyboardAvoidingView,
	ScrollView,
	View,
	Image,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { CusInput, CusButton, CusText, CusSelect } from '../shared';
import moment from 'moment';
import { useData } from '../../DataContext';
import { useState } from 'react';

const RegisterPage = ({ navigation }) => {
	const [error, setError] = useState();
	const [success, setSuccess] = useState();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm({
		defaultValues: {
			created_at: moment().format(),
			borrowedQuan: 0,
		},
	});
	const password = watch('pass');
	const CONTACT_REGEX = /^(09|\+639)\d{9}$/;
	const PASS_REGEX =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_()]).{8,}$/;

	const { addItem, students } = useData();

	const capitalizeFirstLetter = (string) => {
		return string
			? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
			: '';
	};

	const getMiddleInitial = (mname) => {
		return (mname || '').charAt(0).toUpperCase() + (mname ? '.' : '');
	};

	const onRegisterPress = (data) => {
		const existingStudent = students.find(
			(student) => student.lrn === data.lrn
		);

		if (existingStudent) {
			setError('LRN already exists');
		} else {
			const dataWithDefaults = {
				...data,
				mname: data.mname || '',
			};

			const firstName = capitalizeFirstLetter(dataWithDefaults.fname);
			const middleInitial = getMiddleInitial(dataWithDefaults.mname);
			const lastName = capitalizeFirstLetter(dataWithDefaults.lname);

			const fullName = `${firstName} ${middleInitial} ${lastName}`.trim();

			const dataWithFullName = {
				...dataWithDefaults,
				name: fullName,
			};

			addItem(dataWithFullName, 'students');
			setSuccess('You are now registered, please login.');
		}

		reset();
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
					<View style={styles.imgContainer}>
						<Image
							source={require('../../assets/logo.png')}
							style={styles.logo}
						/>
					</View>

					<View>
						<CusInput
							placeholder={'First Name'}
							name='fname'
							control={control}
							rules={{
								required: 'Name is required.',
								validate: (value) =>
									value === '' || setError('none'),
							}}
							autoCapitalize='words'
						/>
						<CusInput
							placeholder={'Middle Name'}
							name='mname'
							control={control}
							autoCapitalize='words'
						/>
						<CusInput
							placeholder={'Last Name'}
							name='lname'
							control={control}
							rules={{
								required: 'Name is required.',
								validate: (value) =>
									value === '' || setError('none'),
							}}
							autoCapitalize='words'
						/>
						<CusInput
							placeholder={'LRN Number'}
							name='lrn'
							control={control}
							rules={{
								required:
									'LRN is required. This will served as username.',
								validate: (value) =>
									value === '' || setError('none'),
							}}
							autoCapitalize='words'
							type={'number'}
							maxLength={11}
							keyboardType='numeric'
						/>

						<CusSelect
							placeholder='Grade'
							name='grade'
							control={control}
							options={[
								{ label: 'Grade 7', value: '7' },
								{ label: 'Grade 8', value: '8' },
								{ label: 'Grade 9', value: '9' },
								{ label: 'Grade 10', value: '10' },
							]}
							rules={{
								required: 'Selection is required.',
							}}
						/>

						<CusInput
							placeholder={'Section'}
							name='section'
							control={control}
							rules={{
								required: 'Section is required.',
								validate: (value) =>
									value === '' || setError('none'),
							}}
							autoCapitalize='words'
						/>
						<CusInput
							placeholder={"Guardian's Name"}
							name='guardian'
							control={control}
							rules={{
								required: 'Guardian is required.',
								validate: (value) =>
									value === '' || setError('none'),
							}}
							autoCapitalize='words'
						/>

						<CusInput
							placeholder={"Guardian's Contact No."}
							name='cnum'
							control={control}
							rules={{
								required: 'Contact Number is required.',
								pattern: {
									value: CONTACT_REGEX,
									message:
										'Contact Number is invalid. It must be 11-digit number for 09 or 12-digits for +639.',
								},
							}}
							keyboardType='numeric'
							type='tel'
							maxLength={13}
						/>

						<CusInput
							placeholder={'Password'}
							name='pass'
							control={control}
							rules={{
								required: 'Password is required.',
								pattern: {
									value: PASS_REGEX,
									message:
										'Password should have minimum eight characters, at least one upper case letter, one lower case letter, one number and one special character.',
								},
								validate: (value) =>
									value === password || setError('none'),
							}}
							secureTextEntry
							type={'password'}
						/>
						<CusInput
							placeholder={'Confirm Password'}
							name='conpass'
							control={control}
							rules={{
								required: 'Retyping password is required.',
								validate: (value) =>
									value === password ||
									'Password do not match.',
							}}
							secureTextEntry
							type={'password'}
						/>

						{error !== 'none' && (
							<CusText
								text={error}
								type={'PRIMARY'}
								size={11}
								color='red'
								font={'Montserrat-Regular'}
								align='center'
							/>
						)}

						{success && (
							<CusText
								text={success}
								type={'PRIMARY'}
								size={11}
								font={'Montserrat-Regular'}
								align='center'
							/>
						)}
						<CusButton
							text={'REGISTER'}
							onPress={handleSubmit(onRegisterPress)}
						/>
						<CusButton
							text={'Login'}
							onPress={() => navigation.navigate('Login')}
							type='TERTIARY'
						/>
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
		padding: 40,
		justifyContent: 'space-between',
	},
	imgContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: 150,
		height: 150,
		marginBottom: 20,
	},
	name: {
		width: '100%',
		resizeMode: 'contain',
	},
	inputContainer: {
		width: '100%',
		paddingBottom: 60,
	},
});

export default RegisterPage;
