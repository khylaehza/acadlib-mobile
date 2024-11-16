import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../themes/Color';

const CustomButton = ({
	onPress,
	text,
	type = 'PRIMARY',
	width = '100%',
	disabled,
	disable,
}) => {
	const styles = StyleSheet.create({
		container: {
			width: width,
			padding: 15,
			borderRadius: 5,
			alignItems: 'center',
		},

		container_PRIMARY: {
			backgroundColor: disabled || disable ? '#d3d3d3' : Colors.primary,
			marginVertical: 5,
			fontFamily: 'Montserrat-Bold',
		},

		container_SECONDARY: {
			borderColor: Colors.primary,
			borderWidth: 2,
		},

		container_TERTIARY: {
			borderRadius: 0,
			padding: 0,
			width: 'auto',
			marginTop: 6,
		},

		container_FOURTH: {
			borderRadius: 0,
			padding: 0,
			width: 'auto',
		},

		text: {
			color: '#000',
			textAlign: 'center',
		},

		text_PRIMARY: {
			fontFamily: 'Montserrat-SemiBold',
			color: 'black',
		},

		text_SECONDARY: {
			color: '#000',
			fontFamily: 'Montserrat-SemiBold',
		},

		text_TERTIARY: {
			color: Colors.primary,
			textDecorationLine: 'underline',
			fontFamily: 'Montserrat-SemiBold',
			fontSize: 14,
		},

		text_FOURTH: {
			color: 'red',
			// textDecorationLine: 'underline',
			fontFamily: 'Montserrat-SemiBold',
			fontSize: 12,
		},
	});

	return (
		<TouchableOpacity
			onPressIn={onPress}
			style={[styles.container, styles[`container_${type}`]]}
			disabled={disable}
		>
			<Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
		</TouchableOpacity>
	);
};

export default CustomButton;
