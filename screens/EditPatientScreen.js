import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Card } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import * as patientsActions from '../store/actions/patient';

const EditPatientScreen = (props) => {
	// To populate when in edit mode get patId
	const patId = props.navigation.getParam('patientId');

	// Getting edited patient if patient id is set then we are in edit mode
	const editedPatient = useSelector((state) =>
		state.patients.clients.find((pat) => pat.id === patId)
	);
	const dispatch = useDispatch();

	// If the the title is set then initialize with title else with empty string. Same goes for other properties
	const [title, setTitle] = useState(editedPatient ? editedPatient.title : '');
	const [imageUrl, setImageUrl] = useState(
		editedPatient ? editedPatient.imageUrl : ''
	);
	const [diagnosis, setDiagnosis] = useState(
		editedPatient ? editedPatient.diagnosis : ''
	);
	const [age, setAge] = useState(editedPatient ? editedPatient.age : '');

	const [description, setDescription] = useState(
		editedPatient ? editedPatient.description : ''
	);
	const [bodyTemperature, setBodyTemperature] = useState(
		editedPatient ? editedPatient.bodyTemperature : ''
	);
	const [pulseRate, setPulseRate] = useState(
		editedPatient ? editedPatient.pulseRate : ''
	);
	const [respirationRate, setRespirationRate] = useState(
		editedPatient ? editedPatient.respirationRate : ''
	);
	const [systolicBP, setSystolicBP] = useState(
		editedPatient ? editedPatient.systolicBP : ''
	);
	const [diastolicBP, setDiastolicBP] = useState(
		editedPatient ? editedPatient.diastolicBP : ''
	);
	const [o2sat, setO2sat] = useState(editedPatient ? editedPatient.o2sat : '');

	const submitHandler = useCallback(() => {
		if (editedPatient) {
			// then we are editing and dispatch update patient action
			dispatch(
				patientsActions.updatePatient(
					patId,
					title,
					imageUrl,
					diagnosis,
					age,
					description,
					bodyTemperature,
					pulseRate,
					respirationRate,
					systolicBP,
					diastolicBP,
					o2sat
				)
			);
		} else {
			dispatch(
				patientsActions.createPatient(
					// else dispatch create patient action
					title,
					imageUrl,
					diagnosis,
					age,
					description,
					bodyTemperature,
					pulseRate,
					respirationRate,
					systolicBP,
					diastolicBP,
					o2sat
				)
			);
		}
		props.navigation.goBack();
	}, [
		dispatch,
		patId,
		title,
		imageUrl,
		diagnosis,
		age,
		description,
		bodyTemperature,
		pulseRate,
		respirationRate,
		systolicBP,
		diastolicBP,
		o2sat,
	]);

	useEffect(() => {
		props.navigation.setParams({ submit: submitHandler });
	}, [submitHandler]);

	return (
		<ScrollView>
			<KeyboardAvoidingView keyboardVerticalOffset={50}>
				<Card style={styles.form}>
					<View style={styles.formControl}>
						<TextInput
							label='Name'
							keyboardType='default'
							style={styles.input}
							value={title}
							onChangeText={(text) => setTitle(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Image URL'
							keyboardType='default'
							multiline
							style={styles.input}
							value={imageUrl}
							onChangeText={(text) => setImageUrl(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Diagnosis'
							keyboardType='default'
							style={styles.input}
							value={diagnosis}
							onChangeText={(text) => setDiagnosis(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Age'
							keyboardType='default'
							style={styles.input}
							value={age}
							onChangeText={(text) => setAge(text)}
						/>
					</View>

					<View style={styles.formControl}>
						<TextInput
							label='Description'
							keyboardType='default'
							multiline
							style={styles.input}
							value={description}
							onChangeText={(text) => setDescription(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Body Temperature'
							keyboardType='default'
							style={styles.input}
							value={bodyTemperature}
							onChangeText={(text) => setBodyTemperature(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Pulse Rate'
							keyboardType='default'
							style={styles.input}
							value={pulseRate}
							onChangeText={(text) => setPulseRate(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Respiration Rate'
							keyboardType='default'
							style={styles.input}
							value={respirationRate}
							onChangeText={(text) => setRespirationRate(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Systolic BP'
							keyboardType='default'
							style={styles.input}
							value={systolicBP}
							onChangeText={(text) => setSystolicBP(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Diastolic BP'
							keyboardType='default'
							style={styles.input}
							value={diastolicBP}
							onChangeText={(text) => setDiastolicBP(text)}
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Oxygen Saturation'
							keyboardType='default'
							style={styles.input}
							value={o2sat}
							onChangeText={(text) => setO2sat(text)}
						/>
					</View>
				</Card>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

EditPatientScreen.navigationOptions = (navData) => {
	const submitFn = navData.navigation.getParam('submit');
	return {
		headerTitle: navData.navigation.getParam('patientId')
			? 'Edit Patient'
			: 'Add Patient',
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Save'
					iconName={
						Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
					}
					onPress={submitFn}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	form: {
		margin: 20,
		padding: 5,
		backgroundColor: '#E9D393',
	},
	formControl: {
		width: '100%',
		paddingLeft: 10,
		backgroundColor: '#FEF6D6',
	},
	input: {
		padding: 2,
		paddingVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		backgroundColor: '#FEF6D6',
	},
});

export default EditPatientScreen;
