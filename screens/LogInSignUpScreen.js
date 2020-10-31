import React, { useState, useReducer, useCallback, useEffect } from 'react';
import {
	ScrollView,
	View,
	Alert,
	KeyboardAvoidingView,
	StyleSheet,
	Button,
} from 'react-native';

import { TextInput, Card, Image } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as logInSignUpAction from '../store/actions/logInSignUp';

const formReducer = (state, action) => {
	if (action.type === 'FORM_INPUT_UPDATE') {
		const updatedValues = {
			...state.inputValues,
			[action.input]: action.value,
		};
		const updatedValidities = {
			...state.inputValidities,
			[action.input]: action.isValid,
		};
		let updatedFormIsValid = true;
		for (const key in updatedValidities) {
			updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
		}
		return {
			formIsValid: updatedFormIsValid,
			inputValidities: updatedValidities,
			inputValues: updatedValues,
		};
	}
	return state;
};

const LogInSignUpScreen = (props) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const [error, setError] = useState();
	const dispatch = useDispatch();
	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});

	useEffect(() => {
		if (error) {
			Alert.alert('An Error Occurred!', error, [{ text: 'Ok' }]);
		}
	}, [error]);

	const loginSignupHandler = async () => {
		let action;
		if (isSignUp) {
			action = logInSignUpAction.signup(
				formState.inputValues.email,
				formState.inputValues.password
			);
		} else {
			action = logInSignUpAction.login(
				formState.inputValues.email,
				formState.inputValues.password
			);
		}
		setError(null);
		try {
			await dispatch(action);
			props.navigation.navigate('AddEdit');
		} catch (err) {
			setError(err.message);
		}
	};

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: 'FORM_INPUT_UPDATE',
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

	return (
		<View >
		<KeyboardAvoidingView keyboardVerticalOffset={50} >
			<ScrollView >
				<Card>

				</Card>
				<Card style={styles.container}>
					<View>
						<TextInput
							id='email'
							label='E-Mail'
							keyboardType='email-address'
							required
							email
							autoCapitalize='none'
							errorText='Please enter a valid email address.'
							value={formState.inputValues.email}
							onChangeText={inputChangeHandler.bind(this, 'email')}
							autoCorrect
							returnKeyType='next'
							initialValue=''
						/>
					</View>
					<View style={styles.formControl}>
						<TextInput
							id='password'
							label='Password'
							keyboardType='default'
							secureTextEntry
							required
							minLength={5}
							autoCapitalize='none'
							errorText='Please enter a valid password.'
							onChangeText={inputChangeHandler.bind(this, 'password')}
							initialValue=''
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							title={isSignUp ? 'Sign Up' : 'Login'}
							color={Colors.primary}
							onPress={loginSignupHandler}
						/>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							title={isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
							color={Colors.accent}
							onPress={() => {
								setIsSignUp((prevState) => !prevState);
							}}
						/>
					</View>
				</Card>
			</ScrollView>

		</KeyboardAvoidingView>
		</View>
	);
};

LogInSignUpScreen.navigationOptions = {
	headerTitle: 'Login/Sign Up',
};

const styles = StyleSheet.create({
	screen:{
		backgroundColor: "#393b44"
	},
	container: {
		width: '100%',
		maxWidth: 500,
		maxHeight: 500,
		padding: 40,
		margin: 10
	},
	buttonContainer: {
		marginTop: 20,
	},
	form: {
		margin: 20,
	},
});

export default LogInSignUpScreen;
