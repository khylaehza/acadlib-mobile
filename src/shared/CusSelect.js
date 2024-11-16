import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	FlatList,
} from 'react-native';
import { Controller } from 'react-hook-form';
import { FontAwesome5 } from '@expo/vector-icons';

const CusSelect = ({
	control,
	name,
	rules = {},
	placeholder,
	options = [],
	border = '#FFF',
	bColor = '#FFF',
	mv = 7,
	size = 14,
}) => {
	const [bgColor, setBgColor] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
		label: {
			fontSize: 10,
			fontFamily: 'Montserrat-Medium',
		},
		input: {
			color: '#000',
			fontSize: size,
			fontFamily: 'Montserrat-Medium',
		},
		error: {
			color: 'red',
			fontSize: 12.2,
			fontFamily: 'Montserrat-Medium',
		},
		placeholder: {
			color: 'gray',
		},
		option: {
			padding: 20,
			borderBottomColor: '#ccc',
			borderBottomWidth: 1,
		},
	});

	const handleSelect = (onChange, value) => {
		onChange(value);
		setIsDropdownOpen(false);
	};

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<TouchableOpacity
						style={[
							styles.container,
							{
								borderColor: error ? 'red' : border,
								backgroundColor: bgColor ? bColor : '#FFF',
							},
						]}
						onPress={() => setIsDropdownOpen(true)}
					>
						<Text style={[styles.label]}>{placeholder}</Text>
						<Text
							style={[
								styles.input,
								value ? null : styles.placeholder,
							]}
						>
							{value || placeholder}
						</Text>
					</TouchableOpacity>

					{error && (
						<Text style={styles.error}>
							{error.message || 'Error'}
						</Text>
					)}

					<Modal
						visible={isDropdownOpen}
						transparent
						animationType='fade'
					>
						<TouchableOpacity
							style={{
								flex: 1,
								backgroundColor: 'rgba(0,0,0,0.5)',
								alignContent: 'center',
								justifyContent: 'center',
							}}
							onPress={() => setIsDropdownOpen(false)}
						>
							<View
								style={{
									marginHorizontal: 20,
									backgroundColor: 'white',
									borderRadius: 5,
								}}
							>
								<FlatList
									data={options}
									keyExtractor={(item) =>
										item.value.toString()
									}
									renderItem={({ item }) => (
										<TouchableOpacity
											style={styles.option}
											onPress={() =>
												handleSelect(
													onChange,
													item.value
												)
											}
										>
											<Text style={styles.input}>
												{item.label}
											</Text>
										</TouchableOpacity>
									)}
								/>
							</View>
						</TouchableOpacity>
					</Modal>
				</>
			)}
		/>
	);
};

export default CusSelect;
