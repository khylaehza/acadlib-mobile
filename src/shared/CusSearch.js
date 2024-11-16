import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';
import Colors from '../../themes/Color';

const CusSearch = ({ control, name, placeholder, w = '100%' }) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { value, onChange } }) => (
				<View style={[styles.container, { width: w }]}>
					<View style={styles.iconContainer}>
						<Ionicons
							name='search-outline'
							size={24}
							color={'green'}
						/>
					</View>
					<TextInput
						style={styles.input}
						placeholder={placeholder}
						placeholderTextColor='#000'
						value={value || ''}
						onChangeText={onChange}
					/>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF',
		height: 50,
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 8,
	},
	iconContainer: {
		paddingLeft: 8,
		paddingRight: 8,
	},
	input: {
		flex: 1,
		fontFamily: 'Montserrat-Regular',
		fontSize: 15,
		color: '#000',
	},
});

export default CusSearch;
