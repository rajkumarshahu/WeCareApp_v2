import Patient from "../../models/patient";
// Defining identifiers
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const SET_PATIENTS = 'SET_PATIENTS'

export const fetchPatients = () => {
	return async dispatch =>{

		const response = await fetch('https://api-wecare.herokuapp.com/patients');

		const resData = await response.json();

		console.log(resData)

		const fetchedPatients = [];

		for (const key in resData) {
			fetchedPatients.push(new Patient(
				key,
				resData.title,
				resData.imageUrl,
				resData.diagnosis,
				resData.age,
				resData.description,
				resData.bodyTemperature,
				resData.pulseRate,
				resData.respirationRate,
				resData.systolicBP,
				resData.diastolicBP,
				resData.o2sat
			))

		}

		dispatch({ type: SET_PATIENTS, patients: fetchedPatients })
	}
}

export const deletePatient = (patientId) => {
	return { type: DELETE_PATIENT, pid: patientId };
};

export const createPatient = (
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
) => {
	return async dispatch =>{

		const response = await fetch('https://api-wecare.herokuapp.com/patients',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
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
			})
		});

		const resData = await response.json();

		console.log(resData);

		dispatch( {
			type: CREATE_PATIENT,
			patientData: {
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
			},
		});
	}

};

export const updatePatient = (
	id,
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
) => {
	return {
		type: UPDATE_PATIENT,
		pid: id,
		patientData: {
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
		},
	};
};
