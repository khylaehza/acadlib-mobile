import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
const CusInput = ({
	control,
	name,
	rules = {},
	placeholder,
	secureTextEntry,
	keyboardType,
	type,
	maxLength,
	autoCapitalize,
	border = '#FFF',
	bColor = '#FFF',
	h = 45,
	size = 14,
	mv = 7,
	multiline = false,
}) => {
	const [bgColor, setBgColor] = useState(false);
	const [showPassword, setShowPassword] = useState(true);

	const handleState = () => {
		!secureTextEntry;
		setShowPassword((showState) => {
			return !showState;
		});
	};

	const styles = StyleSheet.create({
		container: {
			backgroundColor: '#FFF',
			width: '100%',
			borderColor: '#000',
			borderWidth: 1,
			borderRadius: 5,
			padding: 12,
			marginVertical: mv,
			alignSelf: 'center',
		},
		input: {
			color: '#000',
			fontFamily: 'Montserrat-Medium',
		},
		error: {
			color: 'red',
			alignSelf: 'stretch',
			top: -5,
			left: 3,
			fontSize: 12.2,
			fontFamily: 'Montserrat-Medium',
		},
		label: {
			fontSize: 10,
			fontFamily: 'Montserrat-Medium',
		},
	});

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<View
						style={[
							styles.container,
							{
								borderColor: error ? 'red' : border,
								backgroundColor: bgColor ? bColor : '#FFF',
							},
						]}
					>
						{type == 'password' ? (
							<View
								justifyContent='space-between'
								alignItems='center'
								style={{
									display: 'flex',
									flexDirection: 'row',
								}}
							>
								<View
									style={{
										display: 'flex',
										flexDirection: 'column',
										width: '90%',
									}}
								>
									<Text style={[styles.label]}>
										{placeholder}
									</Text>
									<TextInput
										value={value}
										onChangeText={onChange}
										placeholder={placeholder}
										style={[styles.input]}
										secureTextEntry={showPassword}
										keyboardType={keyboardType}
										onFocus={() => setBgColor(true)}
										onBlur={() => setBgColor(false)}
										type={type}
										maxLength={maxLength}
										autoCapitalize={autoCapitalize}
										fontSize={size}
										width={'80%'}
									/>
								</View>

								<TouchableOpacity
									onPress={handleState}
									style={styles.toggleButton}
								>
									<FontAwesome5
										name={
											showPassword ? 'eye-slash' : 'eye'
										}
										size={15}
										color={showPassword ? 'gray' : 'green'}
									/>
								</TouchableOpacity>
							</View>
						) : (
							<>
								<Text style={[styles.label]}>
									{placeholder}
								</Text>
								<TextInput
									value={value}
									onChangeText={onChange}
									placeholder={placeholder}
									style={[styles.input]}
									secureTextEntry={secureTextEntry}
									keyboardType={keyboardType}
									onFocus={() => setBgColor(true)}
									onBlur={() => setBgColor(false)}
									type={type}
									maxLength={maxLength}
									autoCapitalize={autoCapitalize}
									multiline={multiline}
								/>
							</>
						)}
					</View>
					{error && (
						<Text style={styles.error}>
							{error.message || 'Error'}
						</Text>
					)}
				</>
			)}
		/>
	);
};

export default CusInput;
