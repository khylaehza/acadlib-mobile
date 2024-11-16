import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
const BookLayout = ({ book, index }) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			key={index}
			style={styles.bookContainer}
			onPress={() => navigation.navigate('Book', { book })}
		>
			<Image
				source={{ uri: book.image }}
				style={styles.image}
			/>
			<Text style={styles.title}>{book.title}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	bookContainer: {
		marginBottom: 20,
		alignItems: 'center',
	},
	image: {
		width: 100,
		height: 150,
		resizeMode: 'cover',
		borderRadius: 10,
	},
	title: {
		marginTop: 10,
		fontSize: 14,
		textAlign: 'center',
		fontFamily: 'Montserrat-Medium',
		color: 'black',
		width: 100,
	},
});

export default BookLayout;
