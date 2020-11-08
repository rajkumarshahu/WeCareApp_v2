import Patient from '../../models/patient';
// Defining identifiers
export const DELETE_PATIENT = 'DELETE_PATIENT';
export const CREATE_PATIENT = 'CREATE_PATIENT';
export const UPDATE_PATIENT = 'UPDATE_PATIENT';
export const SET_PATIENTS = 'SET_PATIENTS';

const api_host = 'http://localhost:5000/';
// const api_host = 'api-wecare.herokuapp.com/';
export const fetchPatients = () => {
	return async (dispatch) => {
		const response = await fetch(`${api_host}patients`);

		let resData = await response.json();
		resData = resData.data;

		const fetchedPatients = [];

		for (const key in resData) {
			let records = resData[key].records;
			let bodyTemperature = '',
			pulseRate = '',
			respirationRate = '',
			systolicBP = '',
			diastolicBP = '',
			o2Sat = '',
			rid = '';

			if (records instanceof Array && records.length > 0) {
				let len = records.length;
				for (let i = 0; i < len; i++) {
					bodyTemperature = records[i].bodyTemperature;
					pulseRate = records[i].pulseRate;
					respirationRate = records[i].respirationRate;
					systolicBP = records[i].systolicBP;
					diastolicBP = records[i].diastolicBP;
					o2Sat = records[i].o2Sat;
					rid=records[i]._id;
				}
			}


			let newPatient = new Patient(
				resData[key]._id,
				'u1',
				resData[key].title,
				resData[key].photo,
				resData[key].diagnosis,
				resData[key].age,
				resData[key].phone,
				resData[key].email,
				resData[key].address,
				resData[key].description,
				bodyTemperature,
				pulseRate,
				respirationRate,
				systolicBP,
				diastolicBP,
				o2Sat,
				resData[key].isCritical,
				rid
			);

			fetchedPatients.push(newPatient);
		}

		dispatch({ type: SET_PATIENTS, patients: fetchedPatients });
	};
};

export const deletePatient = (patientId) => {
	return async dispatch => {
		const response = await fetch(`${api_host}patients/${patientId}`,{
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		});

		let resData = await response.json();
		resData = resData.data;

		dispatch( {
			type: DELETE_PATIENT,
			pid: patientId
		});
	}
};

export const createPatient = (
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
	o2Sat,
	isCritical
) => {
	return async (dispatch) => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('photo', photo);
		formData.append('diagnosis', diagnosis);
		formData.append('age', age);
		formData.append('phone', phone);
		formData.append('email', email);
		formData.append('address', address);
		formData.append('description', description);
		formData.append('isCritical', isCritical);

		const response = await fetch(`${api_host}patients`,{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: formData,
		});

		let resData = await response.json();
		resData = resData.data;

		let recordData = new FormData();
		recordData.append('bodyTemperature', bodyTemperature);
		recordData.append('pulseRate', pulseRate);
		recordData.append('respirationRate', respirationRate);
		recordData.append('systolicBP', systolicBP);
		recordData.append('diastolicBP', diastolicBP);
		recordData.append('o2Sat', o2Sat);

		const record_response = await fetch(`${api_host}patients/${resData._id}/records`,{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: recordData,
		});

		let recordDataResponse = await record_response.json();
		recordDataResponse = recordDataResponse.data;

		dispatch({
			type: CREATE_PATIENT,
			patientData: {
				pid: resData._id,
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
				o2Sat,
				isCritical,
				rid: recordDataResponse._id
			},
		});

	};
};

export const updatePatient = (
	pid,
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
	o2Sat,
	isCritical,
	rid
) => {
	return async dispatch => {
		const formData = new FormData();
		formData.append('title', title);
		formData.append('photo', photo);
		formData.append('diagnosis', diagnosis);
		formData.append('age', age);
		formData.append('phone', phone);
		formData.append('email', email);
		formData.append('address', address);
		formData.append('description', description);
		formData.append('isCritical', isCritical);

		let recordDataResponse;

		const response = await fetch(`${api_host}patients/${pid}`,{
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: formData,
		});

		let resData = await response.json();
		resData = resData.data;
		console.log(resData);

		let recordData = new FormData();
		recordData.append('bodyTemperature', bodyTemperature);
		recordData.append('pulseRate', pulseRate);
		recordData.append('respirationRate', respirationRate);
		recordData.append('systolicBP', systolicBP);
		recordData.append('diastolicBP', diastolicBP);
		recordData.append('o2Sat', o2Sat);
console.log('resdata: '+resData._id)
console.log('rid:'+rid)
		if(typeof resData._id !== 'undefined' && rid) {
			const record_response = await fetch(`${api_host}records/${rid}`,{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: recordData,
			});

			recordDataResponse = await record_response.json();
			recordDataResponse = recordDataResponse.data;
		} else {
			// add it
			const record_response = await fetch(`${api_host}patients/${resData._id}/records`,{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: recordData,
			});

			recordDataResponse = await record_response.json();
			recordDataResponse = recordDataResponse.data;
		}
console.log(recordDataResponse);
		dispatch( {
			type: UPDATE_PATIENT,
			pid: pid,
			patientData: {
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
				o2Sat,
				isCritical,
				rid:recordDataResponse._id
			},
		});
	}

};
