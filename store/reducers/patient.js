import PATIENTS from '../../data/dummy-patients';
import Patient from '../../models/patient';
import {
	DELETE_PATIENT,
	CREATE_PATIENT,
	UPDATE_PATIENT,
	SET_PATIENTS
} from '../actions/patient';

// Finding initial state
const initialState = {
	clients: PATIENTS, // Initialized with dummy patients
	criticalPatients: PATIENTS.filter((p) => p.isCritical === true), // Filtered the patients if they are critical
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PATIENTS:
			return {
				clients: action.patients,
				criticalPatients: PATIENTS.filter((p) => p.isCritical === true)
			}
		case DELETE_PATIENT:
			return {
				...state,
				criticalPatients: state.criticalPatients.filter(
					(patient) => patient.id !== action.pid
				),
				clients: state.clients.filter((patient) => patient.id !== action.pid),
			};
		case CREATE_PATIENT:
			// Creating new patient
			const newPatient = new Patient(
				new Date().toString(), // Manually generated id with the help of Date function
				'u1',
				// title and other properties populated with the help of data from action
				action.patientData.title,
				action.patientData.imageUrl,
				action.patientData.diagnosis,
				action.patientData.age,
				action.patientData.description,
				action.patientData.bodyTemperature,
				action.patientData.pulseRate,
				action.patientData.respirationRate,
				action.patientData.systolicBP,
				action.patientData.diastolicBP,
				action.patientData.o2sat
			);
			return {
				// Adds newly created patient to store by updating state
				...state, // first copy the existing state
				clients: state.clients.concat(newPatient), // then add to client and
				criticalPatients: state.criticalPatients.concat(newPatient), // critical patient
			};

		case UPDATE_PATIENT:
			// To update first find the index of the current patient
			const patientIndex = state.criticalPatients.findIndex(
				(pat) => pat.id === action.pid
			);
			const updatedPatient = new Patient(
				action.pid,
				action.careProviderId,
				action.patientData.title,
				action.patientData.imageUrl,
				action.patientData.diagnosis,
				action.patientData.age,
				action.patientData.description,
				action.patientData.bodyTemperature,
				action.patientData.pulseRate,
				action.patientData.respirationRate,
				action.patientData.systolicBP,
				action.patientData.diastolicBP,
				action.patientData.o2sat
			);
			// Updating state
			const updatedCriticalPatients = [...state.criticalPatients]; // copying existing critical patients
			updatedCriticalPatients[patientIndex] = updatedPatient; // replace selected critical patient index with updated patient in the copy
			const clientIndex = state.clients.findIndex(
				(pat) => pat.id === action.pid
			);
			const updatedClients = [...state.clients];
			updatedClients[clientIndex] = updatedPatient;
			return {
				...state,
				clients: updatedClients,
				criticalPatients: updatedCriticalPatients,
			};
	}
	return state;
};