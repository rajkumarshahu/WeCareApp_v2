import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,

} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { TextInput, Card, Switch } from 'react-native-paper';
import { add } from 'react-native-reanimated';
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
	const [photo, setImageUrl] = useState(
		editedPatient ? editedPatient.photo : ''
	);
	const [diagnosis, setDiagnosis] = useState(
		editedPatient ? editedPatient.diagnosis : ''
	);
	console.log(editedPatient);
	const [age, setAge] = useState(editedPatient ? editedPatient.age+'' : '');

	const [phone, setPhone] = useState(
		editedPatient ? editedPatient.phone : ''
	);

	const [email, setEmail] = useState(
		editedPatient ? editedPatient.email : ''
	);

	const [address, setAddress] = useState(
		editedPatient ? editedPatient.address : ''
	);

	const [description, setDescription] = useState(
		editedPatient ? editedPatient.description : ''
	);
	const [bodyTemperature, setBodyTemperature] = useState(
		editedPatient ? editedPatient.bodyTemperature+'' : ''
	);
	const [pulseRate, setPulseRate] = useState(
		editedPatient ? editedPatient.pulseRate+'' : ''
	);
	const [respirationRate, setRespirationRate] = useState(
		editedPatient ? editedPatient.respirationRate+'' : ''
	);
	const [systolicBP, setSystolicBP] = useState(
		editedPatient ? editedPatient.systolicBP+'' : ''
	);
	const [diastolicBP, setDiastolicBP] = useState(
		editedPatient ? editedPatient.diastolicBP+'' : ''
	);
	const [o2sat, setO2sat] = useState(editedPatient ? editedPatient.o2sat+'' : '');
	const [isCritical, setIsCritical] = useState(editedPatient ? editedPatient.isCritical : false);
	const onToggleSwitch = () => setIsCritical(!isCritical);

	const submitHandler = useCallback(() => {
		if (editedPatient) {
			// then we are editing and dispatch update patient action
			dispatch(
				patientsActions.updatePatient(
					patId,
					title,
					photo,
					diagnosis,
					age,
					phone,
					email,
					address,
					description,
					bodyTemperature,
					pulseRate,
					respirationRate,
					systolicBP,
					diastolicBP,
					o2sat,
					isCritical
				)
			);
		} else {
			dispatch(
				patientsActions.createPatient(
					// else dispatch create patient action
					title,
					photo,
					diagnosis,
					age,
					phone,
					email,
					address,
					description,
					bodyTemperature,
					pulseRate,
					respirationRate,
					systolicBP,
					diastolicBP,
					o2sat,
					isCritical
				)
			);
		}
		props.navigation.goBack();
	}, [
		dispatch,
		patId,
		title,
		photo,
		diagnosis,
		age,
		phone,
		email,
		address,
		description,
		bodyTemperature,
		pulseRate,
		respirationRate,
		systolicBP,
		diastolicBP,
		o2sat,
		isCritical
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
							value={photo}
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
							label='Phone'
							keyboardType='default'
							style={styles.input}
							value={phone}
							onChangeText={(text) => setPhone(text)}
						/>
					</View>

					<View style={styles.formControl}>
						<TextInput
							label='Email'
							keyboardType='default'
							style={styles.input}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</View>

					<View style={styles.formControl}>
						<TextInput
							label='Address'
							keyboardType='default'
							style={styles.input}
							value={address}
							onChangeText={(text) => setAddress(text)}
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
					<View style={styles.formControl}>
					<Switch value={isCritical} onValueChange={onToggleSwitch} />
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
