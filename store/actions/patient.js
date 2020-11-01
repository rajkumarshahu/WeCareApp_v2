import Patient from "../../models/patient";
//import axios from 'axios';
// Defining identifiers
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const SET_PATIENTS = 'SET_PATIENTS'


export const fetchPatients = () => {
	return async dispatch =>{

		const response = await fetch('http://localhost:5000/patients');

		let resData = await response.json();
		resData = resData.data;

		const fetchedPatients = [];

		for (const key in resData) {
			fetchedPatients.push(new Patient(
				key,
				'u1',
				resData[key].title,
				resData[key].photo,
				resData[key].diagnosis,
				resData[key].age,
				resData[key].description,
				resData[key].records.bodyTemperature,
				resData[key].records.pulseRate,
				resData[key].records.respirationRate,
				resData[key].records.systolicBP,
				resData[key].records.diastolicBP,
				resData[key].records.o2sat,
				resData[key].isCritical
			));
			console.log(resData[key].records);

		}

		 dispatch({ type: SET_PATIENTS, patients: fetchedPatients })
	}
}

export const deletePatient = (patientId) => {
	return { type: DELETE_PATIENT, pid: patientId };
};

export const createPatient = (
	title,
	photo,
	diagnosis,
	age,
	description,
	bodyTemperature,
	pulseRate,
	respirationRate,
	systolicBP,
	diastolicBP,
	o2sat,
	isCritical
) => {
	return async dispatch =>{
		const formData = new FormData();
		formData.append('title',title);
		formData.append('photo',photo);
		formData.append('diagnosis',diagnosis);
		formData.append('description',description);
		formData.append('bodyTemperature',bodyTemperature);
		formData.append('pulseRate',pulseRate);
		formData.append('respirationRate',respirationRate);
		formData.append('systolicBP',systolicBP);
		formData.append('diastolicBP',diastolicBP);
		formData.append('o2sat',o2sat);
		formData.append('isCritical',true);

		const response = await fetch('http://localhost:5000/patients',{
			method: 'POST',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: formData
		});

		let resData = await response.json();
		console.log(resData);

		resData = resData.data;

		dispatch( {
			type: CREATE_PATIENT,
			patientData: {
				id: resData._id,
				title,
				photo,
				diagnosis,
				age,
				description,
				bodyTemperature,
				pulseRate,
				respirationRate,
				systolicBP,
				diastolicBP,
				o2sat,
				isCritical
			},
		});
	}

};

export const updatePatient = (
	id,
	title,
	photo,
	diagnosis,
	age,
	description,
	bodyTemperature,
	pulseRate,
	respirationRate,
	systolicBP,
	diastolicBP,
	o2sat,
	isCritical
) => {
	return {
		type: UPDATE_PATIENT,
		pid: id,
		patientData: {
			title,
			photo,
			diagnosis,
			age,
			description,
			bodyTemperature,
			pulseRate,
			respirationRate,
			systolicBP,
			diastolicBP,
			o2sat,
			isCritical
		},
	};
};
