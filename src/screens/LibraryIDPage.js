import React, { useCallback } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { CusText } from '../shared';
import { useData } from '../../DataContext';
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
const LibraryIDPage = ({ navigation }) => {
	useFocusEffect(
		useCallback(() => {
			ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE
			);

			return () => {
				ScreenOrientation.unlockAsync();
			};
		}, [])
	);

	const { curUser } = useData();

	return (
		<LinearGradient
			colors={['#EDFF21', '#00AE1F']}
			start={[0, 0]}
			end={[0, 1]}
			style={styles.container}
		>
			<View style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
				<Ionicons
					name='chevron-back'
					size={24}
					color='black'
					onPress={() => navigation.navigate('Homepage')}
				/>
				<Image
					source={require('../../assets/logo.png')}
					style={styles.logo}
				/>
				<View style={{ display: 'flex', flexDirection: 'column' }}>
					<CusText
						type='PRIMARY'
						text={'MALABON NATIONAL HIGH SCHOOL'}
						size={25}
						font='Montserrat-Bold'
					/>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<CusText
							type='PRIMARY'
							text={'Naval St., Malabon, Metro Manila'}
							size={14}
						/>
						<CusText
							type='PRIMARY'
							text={'Library ID Card'}
							size={14}
						/>
					</View>
				</View>
			</View>
			<View style={styles.divider} />
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					width: '90%',
					paddingLeft: 20,
					paddingRight: 20,
				}}
			>
				<View
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 8,
						width: '30%',
					}}
				>
					<Image
						source={require('../../assets/icon.jpg')}
						style={{ height: 130, width: 130, borderRadius: 5 }}
					/>
					<CusText text={'STUDENT'} />
				</View>
				<View
					style={{
						display: 'flex',
						alignItems: 'left',
						gap: 3,
						width: '30%',
					}}
				>
					<CusText
						text={'NAME'}
						align={'left'}
					/>
					<CusText
						text={curUser?.name}
						align={'left'}
						font='Montserrat-Regular'
					/>
					<CusText
						text={'LRN NO.'}
						align={'left'}
					/>
					<CusText
						align={'left'}
						text={curUser?.lrn}
						font='Montserrat-Regular'
					/>
					<CusText
						text={'GRADE - SECTION'}
						align={'left'}
					/>
					<CusText
						align={'left'}
						text={`${curUser?.grade} - ${curUser?.section} `}
						font='Montserrat-Regular'
					/>
					<CusText
						text={'Guardian Name'}
						align={'left'}
					/>
					<CusText
						align={'left'}
						text={curUser?.guardian}
						font='Montserrat-Regular'
					/>
				</View>
				<View
					style={{
						display: 'flex',
						alignItems: 'center',
						gap: 8,
						textAlign: 'left',
						backgroundColor: 'white',
						width: '25%',
						justifyContent: 'center',
						borderRadius: 5,
					}}
				>
					<QRCode
						value={curUser?.lrn}
						size={130}
					/>
				</View>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
	},
	logo: {
		width: 80,
		height: 80,
	},
	divider: {
		width: '92%',
		height: 2,
		backgroundColor: '#000',
		marginVertical: 15,
	},
});

export default LibraryIDPage;
