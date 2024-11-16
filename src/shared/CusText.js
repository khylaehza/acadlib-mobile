import { Text, StyleSheet } from 'react-native';

const CusText = ({
	text,
	type = 'PRIMARY',
	color = '#000',
	align = 'center',
	font = 'Montserrat-SemiBold',
	size = 14,
	transform = 'none',
}) => {
	const styles = StyleSheet.create({
		text: {
			color: color,
			textAlign: align,
			textTransform: transform,
		},

		text_PRIMARY: {
			fontFamily: font,
			fontSize: size,
			textAlign: align,
		},

		text_SECONDARY: {
			// color: Colors.green200,
			fontFamily: font,
		},

		text_TERTIARY: {
			// color: Colors.orange300,
			textDecorationLine: 'underline',
			fontFamily: font,
			fontSize: 14,
		},

		text_FOURTH: {
			// color: Colors.orange300,
			textDecorationLine: 'underline',
			fontFamily: font,
			fontSize: 12,
		},
		text_STRIKE: {
			// color: Colors.green300,
			textAlign: 'left',
			fontFamily: 'Rubik-Regular',
			fontSize: 14,
			textDecorationLine: 'line-through',
		},
		text_HEADING: {
			fontFamily: font,
			fontSize: size,
			color: color,
		},
	});

	return <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>;
};

export default CusText;
