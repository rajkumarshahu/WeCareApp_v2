import React from 'react';
import { FlatList, View, StyleSheet, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IconButton } from 'react-native-paper';

import HeaderButton from '../components/HeaderButton';
import { Card } from 'react-native-paper';
import Colors from '../constants/Colors';

const DashboardScreen = (props) => {
	const patients = useSelector((state) => state.patients.clients);
	const criticalPatients = useSelector(
		(state) => state.patients.criticalPatients
	);
	const selectItemHandler = (id, title) => {
		props.navigation.navigate('PatientDetail', {
			patientId: id,
			patientTitle: title,
		});
	};
	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<Card>
					<View style={styles.container}>
						<View>
							<Text style={styles.summaryText}>
								Total Patients: {patients.length}
							</Text>
						</View>
						<View>
							<Text style={styles.summaryText}>
								Critical Patients: {criticalPatients.length}
							</Text>
						</View>
					</View>
				</Card>
			</View>
			<View>
				<FlatList
					data={criticalPatients}
					keyExtractor={(item) => item.id}
					renderItem={(itemData) => (
						<View style={styles.container}>
							<Card>
								<View style={styles.patientContainer}>
									<IconButton
										icon='alert'
										color='red'
										size={30}
										onPress={() => {
											selectItemHandler(itemData.item.id, itemData.item.title);
										}}
									/>

									<Text style={styles.patientText}>{itemData.item.title}</Text>

									<IconButton
										style={styles.button}
										icon='eye'
										color={Colors.primary}
										size={40}
										onPress={() => {
											selectItemHandler(itemData.item.id, itemData.item.title);
										}}
									/>
								</View>
							</Card>
						</View>
					)}
				/>
			</View>
		</View>
	);
};

DashboardScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Dashboard',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		backgroundColor: '#DAEDED',
	},
	container: {
		padding: 10,
		margin: 10,
		backgroundColor: '#FAFFFF',
	},
	patientContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f1f6f9',
		margin: 10,
	},
	summaryText: {
		fontSize: 30,
		margin: 10,
		marginTop: 30,
		color: Colors.summary,
	},
	patientText: {
		fontSize: 25,
		margin: 10,
		marginTop: 10,
		color: Colors.summary,
	},
	button: {
		alignItems: 'center',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '20%',
		paddingHorizontal: 20,
	},
});

export default DashboardScreen;
