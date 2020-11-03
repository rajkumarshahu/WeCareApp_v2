import React, { useEffect } from 'react';
import { FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import PatientListItem from '../components/PatientListItem';
import Colors from '../constants/Colors';
import * as patientsActions from '../store/actions/patient';

const PatientsListScreen = (props) => {
	// useSelector will allow to get patient information from the store
	// this take a function that takes redux state as an argument and then we are able to get the patient data
	const clients = useSelector(
		(state) => state.patients.clients // here we are getting all the clients
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(patientsActions.fetchPatients());
	}, [dispatch])

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('PatientDetail', {
			patientId: id,
			patientTitle: title,
		});
	};

	const editPatientHandler = (id) => {
		// Navigate edit patient screen with patientId being forwarded
		console.log("patient_id: "+id);
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
	return (
		<FlatList
			data={clients}
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

PatientsListScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Patients',
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
					color={Colors.primary}
					onPress={() => {
						navData.navigation.navigate('EditPatient');
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default PatientsListScreen;
