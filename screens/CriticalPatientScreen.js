import React, { useEffect } from 'react';
import { FlatList, Button, Platform, Alert, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import PatientListItem from '../components/PatientListItem';
import Colors from '../constants/Colors';
import * as patientsActions from '../store/actions/patient';

const CriticalPatientScreen = (props) => {
	const criticalPatients = useSelector(
		(state) => state.patients.criticalPatients
	);
	//console.log(criticalPatients);
	const dispatch = useDispatch();

	// dispatch( {
	// 	type: 'UPDATE_PATIENT',
	// 	pid: '5fa7344eec137b29c664f152',
	// 	patientData: {
	// 		title: 'Raj 03',
	// 		photo: 'https://rajkumarshahu.com/assets/images/raj-photo1.JPG',
	// 		diagnosis: 'asdf',
	// 		age: 23,
	// 		phone: 23,
	// 		email: 'asdf@mail.com',
	// 		address: 'asdf asdf asdf',
	// 		description: 'asdf asdf asdf',
	// 		bodyTemperature: 23,
	// 		pulseRate: 23,
	// 		respirationRate: 23,
	// 		systolicBP: 23,
	// 		diastolicBP: 23,
	// 		o2Sat: 23,
	// 		isCritical: 23,
	// 		rid:'5fa7344fec137b29c664f153'
	// 	},
	// });

	// useEffect(() => {
	// 	dispatch(patientsActions.fetchPatients());
	// }, [dispatch])

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('PatientDetail', {
			patientId: id,
			patientTitle: title,
		});
	};

	const editPatientHandler = (id) => {
		props.navigation.navigate('EditPatient', { patientId: id });
	};

	const deleteHandler = (id) => {
		Alert.alert('Are you sure?', 'Do you really want to delete this patient?', [
			{ text: 'No', style: 'default' },
			{
				text: 'Yes',
				style: 'destructive',
				onPress: () => {
					dispatch(patientsActions.deletePatient(id));
				},
			},
		]);
	};

	if (criticalPatients.length === 0) {
		return (
			<View>
				<Text>There are no patients in critical condition.</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={criticalPatients}
			keyExtractor={(item) => item.id}
			renderItem={(itemData) => (
				<PatientListItem
					image={itemData.item.photo}
					title={itemData.item.title}
					age={itemData.item.age}
					onSelect={() => {
						selectItemHandler(itemData.item.id, itemData.item.title);
					}}
				>
					<Button
						color={Colors.primary}
						title='View Details'
						onPress={() => {
							selectItemHandler(itemData.item.id, itemData.item.title);
						}}
					/>
					<Button
						color={Colors.primary}
						title='Edit'
						onPress={() => {
							editPatientHandler(itemData.item.id);
						}}
					/>
					<Button
						color={Colors.primary}
						title='Delete'
						onPress={deleteHandler.bind(this, itemData.item.id)}
					/>
				</PatientListItem>
			)}
		/>
	);
};

CriticalPatientScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Critical Patients',
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
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Add'
					iconName={
						Platform.OS === 'android'
							? 'md-add-circle-outline'
							: 'ios-add-circle-outline'
					}
					onPress={() => {
						navData.navigation.navigate('EditPatient');
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default CriticalPatientScreen;
