import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	FlatList,
	StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../themes/Color';

const CusDropdown = ({ options = [], placeholder, onSelect }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(null);

	const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

	const handleSelect = (value) => {
		setSelectedValue(value);
		onSelect(value);
		setIsDropdownOpen(false);
	};

	return (
		<View>
			<TouchableOpacity
				style={styles.dropdownContainer}
				onPress={toggleDropdown}
			>
				<Text style={styles.selectedText}>
					{selectedValue || placeholder}
				</Text>
				<Ionicons
					name='filter'
					size={20}
					color='black'
				/>
			</TouchableOpacity>

			<Modal
				visible={isDropdownOpen}
				transparent
				animationType='fade'
			>
				<TouchableOpacity
					style={styles.modalOverlay}
					onPress={toggleDropdown}
				>
					<View style={styles.dropdownList}>
						<FlatList
							data={options}
							keyExtractor={(item) => item.value.toString()}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.option}
									onPress={() => handleSelect(item.value)}
								>
									<Text style={styles.optionText}>
										{item.label}
									</Text>
								</TouchableOpacity>
							)}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	dropdownContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
		height: 50,
		borderColor: Colors.primary,
		borderWidth: 1,
		borderRadius: 8,
		backgroundColor: '#FFF',
	},
	selectedText: {
		fontSize: 8,
		color: 'gray',
		fontFamily: 'Montserrat-Regular',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0,0,0,0.5)',
		justifyContent: 'center',
	},
	dropdownList: {
		backgroundColor: '#FFF',
		marginHorizontal: 20,
		borderRadius: 5,
		padding: 10,
	},
	option: {
		padding: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#ccc',
	},
	optionText: {
		fontSize: 14,
		color: '#000',
		fontFamily: 'Montserrat-Regular',
	},
});

export default CusDropdown;
