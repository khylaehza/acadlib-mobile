import {
	ScrollView,
	View,
	StyleSheet,
	Image,
	KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CusButton, CusInput, CusText } from '../shared';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useData } from '../../DataContext';

const LoginPage = ({ navigation }) => {
	const [error, setError] = useState();
	const { students, setCurUser, curUser } = useData();

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch,
		reset,
	} = useForm();
	const password = watch('password');

	const onLoginPress = (data) => {
		var hasMatch =
			students?.filter((d) => {
				return d.lrn === data.lrn;
			}).length > 0;

		if (!hasMatch) {
			setError('Account does not exist.');
			reset();
		}

		students?.map((user) => {
			try {
				if (data.lrn === user.lrn && data.pass === user.pass) {
					setError('none');
					setCurUser(user);
					navigation.navigate('Homepage');
					reset();
				} else if (data.lrn === user.lrn && user.pass != data.pass) {
					setError('Incorrect Password.');
				} else if (data.lrn == '' || data.pass == '') {
					setError('none');
				}
			} catch (e) {
				console.log(e);
			}
		});
	};

	useEffect(() => {
		if (curUser) {
			navigation.navigate('Homepage');
		}
	}, [curUser, navigation]);

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
						<Image
							source={require('../../assets/name.png')}
							style={styles.name}
						/>
					</View>

					<View style={styles.inputContainer}>
						<CusInput
							placeholder={'LRN No.'}
							name='lrn'
							control={control}
							rules={{
								required: 'LRN is required.',
								validate: (value) =>
									value === '' || setError('none'),
							}}
							autoCapitalize='words'
							type={'number'}
							keyboardType={'numeric'}
							maxLength={11}
						/>
						<CusInput
							placeholder={'Password'}
							name='pass'
							control={control}
							rules={{
								required: 'Password is required.',
								validate: (value) =>
									value === password || setError('none'),
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
						<CusButton
							text={'LOGIN'}
							onPress={handleSubmit(onLoginPress)}
						/>
						<CusButton
							text={'Register'}
							onPress={() => navigation.navigate('Register')}
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
		paddingTop: 60,
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

export default LoginPage;
