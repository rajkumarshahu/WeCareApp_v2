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
				resData[key].bodyTemperature,
				resData[key].pulseRate,
				resData[key].respirationRate,
				resData[key].systolicBP,
				resData[key].diastolicBP,
				resData[key].o2sat,
				resData[key].isCritical
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

		// const response = await axios({
		// 	method: 'post',
		// 	url: 'https://api-wecare.herokuapp.com/patients',
		// 	headers:{
		// 		"Content-Type":"application/json"
		// 	},
		// 	data: {
		// 		title
		// 		photo,
		// 		diagnosis,
		// 		age,
		// 		description',
		// 		bodyTemperature,
		// 		pulseRate,
		// 		respirationRate,
		// 		systolicBP',
		// 		diastolicBP,
		// 		o2sat
		// 	}
		// })
		// const resData = await response
		const response = await fetch('http://localhost:5000/patients',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
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
			})
		});

		const resData = await response.json();
		resData = resData.data;

		console.log(resData);

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
