import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CusAccordion = ({ title, children }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity
				style={styles.header}
				onPress={toggleExpand}
			>
				<Text style={styles.headerText}>{title}</Text>
				<MaterialIcons
					name={
						isExpanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'
					}
					size={24}
					color='#000'
				/>
			</TouchableOpacity>
			{isExpanded && <View style={styles.content}>{children}</View>}
		</View>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		marginBottom: 10,
		borderRadius: 5,
		overflow: 'hidden',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		backgroundColor: '#fff',
	},
	headerText: {
		color: '#000',
		fontSize: 14,
		fontFamily: 'Montserrat-SemiBold',
	},
	content: {
		padding: 15,
	},
});

export default CusAccordion;
