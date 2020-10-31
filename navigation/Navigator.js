import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Platform, View, SafeAreaView, Button, Text } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {
	createDrawerNavigator,
	DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import * as logInSignUpActions from '../store/actions/logInSignUp';
import PatientsListScreen from '../screens/PatientsListScreen';
import PatientDetailScreen from '../screens/PatientDetailScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EditPatientScreen from '../screens/EditPatientScreen';
import LogInSignUpScreen from '../screens/LogInSignUpScreen';
import Colors from '../constants/Colors';
import CriticalPatientScreen from '../screens/CriticalPatientScreen';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTintColor: Platform.OS === 'android' ? Colors.title : Colors.primary,
};

// Screens mapped to identifiers
const PatientsNavigator = createStackNavigator(
	{
		PatientsList: PatientsListScreen,
		PatientDetail: PatientDetailScreen,
	},
	{
		navigationOptions: {
			tabBarIcon: (tabConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-people' : 'ios-people'}
					size={50}
					color={tabConfig.tintColor}
				/>
			),
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-people' : 'ios-people'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
	}
);

const DashBoardNavigator = createStackNavigator(
	{
		Dashboard: DashboardScreen,
	},
	{
		navigationOptions: {
			tabBarIcon: (tabConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
					size={50}
					color={tabConfig.tintColor}
				/>
			),
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
	},

	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const AdminNavigator2 = createStackNavigator(
	{
		PatientsList: PatientsListScreen,
		EditPatient: EditPatientScreen,
	},
	{
		navigationOptions: {
			tabBarIcon: (tabConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					size={50}
					color={tabConfig.tintColor}
				/>
			),
			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
	},

	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const AdminNavigator = createStackNavigator(
	{
		CriticalPatients: CriticalPatientScreen,
		EditPatient: EditPatientScreen,
	},
	{
		navigationOptions: {
			tabBarIcon: (tabConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-alert' : 'ios-alert'}
					size={50}
					color={tabConfig.tintColor}
				/>
			),

			drawerIcon: (drawerConfig) => (
				<Ionicons
					name={Platform.OS === 'android' ? 'md-alert' : 'ios-alert'}
					size={23}
					color={drawerConfig.tintColor}
				/>
			),
		},
	},

	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

// Drawer Navigator

const AddEditNavigator = createDrawerNavigator(
	{
		DashBoard: DashBoardNavigator,
		Patients: PatientsNavigator,
		CriticalPatient: AdminNavigator,
		AddPatient: AdminNavigator2,
	},
	{
		contentOptions: {
			activeTintColor: Colors.primary,
		},
		contentComponent: (props) => {

			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1, paddingTop: 20 }}>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerNavigatorItems {...props} />

						<Button
							title='Logout'
							color={Colors.primary}
							onPress={() => {
								dispatch(logInSignUpActions.logout());
								props.navigation.navigate('LogInSignUp');
							}}
						/>
					</SafeAreaView>
				</View>
			);
		},
	}
);

// const AddEditNavigator = createBottomTabNavigator({
//     DashBoard: DashBoardNavigator,
//     Patients : PatientsNavigator,
//     CriticalPatient: AdminNavigator,
//     EditPatient: AdminNavigator2
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     }
// });

const LogInSignUpNavigator = createStackNavigator(
	{
		LogInSignUp: LogInSignUpScreen,
	},
	{ defaultNavigationOptions: defaultNavOptions }
);

const PrimaryNav = createSwitchNavigator({
	// Not able to go back to login screen after logging in
	LogInSignUp: LogInSignUpNavigator,
	AddEdit: AddEditNavigator,
});
// Wrapped in app container and exported and rendered to App.js
export default createAppContainer(PrimaryNav);
