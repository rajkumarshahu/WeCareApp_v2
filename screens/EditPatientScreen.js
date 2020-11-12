import React, { useState, useEffect, useCallback } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Platform,
	KeyboardAvoidingView,
	Text,
} from 'react-native';
import { TextInput, Card, Switch, Title, Paragraph } from 'react-native-paper';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import * as patientsActions from '../store/actions/patient';

const EditPatientScreen = (props) => {
	// To populate when in edit mode get patId
	const patId = props.navigation.getParam('patientId');
	//console.log(patId);

	// Getting edited patient if patient id is set then we are in edit mode
	const editedPatient = useSelector((state) =>
		state.patients.clients.find((pat) => pat.id === patId)
	);

	//console.log(editedPatient);

	const dispatch = useDispatch();

	// If the the title is set then initialize with title else with empty string. Same goes for other properties
	const [title, setTitle] = useState(editedPatient ? editedPatient.title : '');
	const [photo, setImageUrl] = useState(
		editedPatient ? editedPatient.photo : ''
	);
	const [diagnosis, setDiagnosis] = useState(
		editedPatient ? editedPatient.diagnosis : ''
	);

	const [age, setAge] = useState(editedPatient ? editedPatient.age + '' : '');

	const [phone, setPhone] = useState(editedPatient ? editedPatient.phone : '');

	const [email, setEmail] = useState(editedPatient ? editedPatient.email : '');

	const [address, setAddress] = useState(
		editedPatient ? editedPatient.address : ''
	);

	const [description, setDescription] = useState(
		editedPatient ? editedPatient.description : ''
	);
	const [bodyTemperature, setBodyTemperature] = useState(
		editedPatient ? editedPatient.bodyTemperature + '' : ''
	);
	const [pulseRate, setPulseRate] = useState(
		editedPatient ? editedPatient.pulseRate + '' : ''
	);
	const [respirationRate, setRespirationRate] = useState(
		editedPatient ? editedPatient.respirationRate + '' : ''
	);
	const [systolicBP, setSystolicBP] = useState(
		editedPatient ? editedPatient.systolicBP + '' : ''
	);
	const [diastolicBP, setDiastolicBP] = useState(
		editedPatient ? editedPatient.diastolicBP + '' : ''
	);
	const [o2sat, setO2Sat] = useState(
		editedPatient ? editedPatient.o2sat + '' : ''
	);

	const [isCritical, setIsCritical] = useState(
		editedPatient ? editedPatient.isCritical : false
	);
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
					isCritical,
					editedPatient.rid
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
		isCritical,
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
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Image URL'
							keyboardType='url'
							multiline
							style={styles.input}
							value={photo}
							autoCapitalize='none'
							onChangeText={(text) => setImageUrl(text)}
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Diagnosis'
							keyboardType='default'
							style={styles.input}
							value={diagnosis}
							onChangeText={(text) => setDiagnosis(text)}
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Age'
							keyboardType='decimal-pad'
							style={styles.input}
							value={age}
							onChangeText={(text) => setAge(text)}
							returnKeyType='next'
						/>
					</View>

					<View style={styles.formControl}>
						<TextInput
							label='Phone'
							keyboardType='default'
							style={styles.input}
							value={phone}
							onChangeText={(text) => setPhone(text)}
							returnKeyType='next'
						/>
					</View>

					<View style={styles.formControl}>
						<TextInput
							label='Email'
							keyboardType='email-address'
							style={styles.input}
							autoCapitalize='none'
							value={email}
							onChangeText={(text) => setEmail(text)}
							returnKeyType='next'
						/>
					</View>

					<View style={styles.formControl}>
						<TextInput
							label='Address'
							keyboardType='default'
							style={styles.input}
							value={address}
							onChangeText={(text) => setAddress(text)}
							returnKeyType='next'
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
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Body Temperature'
							keyboardType='decimal-pad'
							style={styles.input}
							value={bodyTemperature}
							onChangeText={(text) => setBodyTemperature(text)}
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Pulse Rate'
							keyboardType='decimal-pad'
							style={styles.input}
							value={pulseRate}
							onChangeText={(text) => setPulseRate(text)}
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Respiration Rate'
							keyboardType='decimal-pad'
							style={styles.input}
							value={respirationRate}
							onChangeText={(text) => setRespirationRate(text)}
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Systolic BP'
							keyboardType='decimal-pad'
							style={styles.input}
							value={systolicBP}
							onChangeText={(text) => setSystolicBP(text)}
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Diastolic BP'
							keyboardType='decimal-pad'
							style={styles.input}
							value={diastolicBP}
							onChangeText={(text) => setDiastolicBP(text)}
							returnKeyType='next'
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							label='Oxygen Saturation'
							keyboardType='decimal-pad'
							style={styles.input}
							value={o2sat}
							onChangeText={(text) => setO2Sat(text)}
							returnKeyType='next'
						/>
					</View>
					<View>
						<View>
							<Card>
								<Card.Content style={styles.switch}>
									{isCritical == true ? (
										<Title>Mark Patient as Non-Critical:</Title>
									) : (
										<Title>Mark Patient as Critical:</Title>
									)}
									<Paragraph>
										<Switch value={isCritical} onValueChange={onToggleSwitch} />
									</Paragraph>
								</Card.Content>
							</Card>
						</View>
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
	switch: {
		flexDirection: 'row',
		backgroundColor: '#FEF6D6',
	},
});

export default EditPatientScreen;
