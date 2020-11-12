export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const signup = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk8P4NFWDsydZvE3lkPWgs80xScSRpFMw',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = 'OOPS!!!';
			if (errorId === 'EMAIL_EXISTS') {
				message = 'Email already exists!!';
			}
			throw new Error(message);
		}

		const resData = await response.json();
		console.log('Sign up', resData);
		dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
	};
};

export const login = (email, password) => {
	return async (dispatch) => {
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDk8P4NFWDsydZvE3lkPWgs80xScSRpFMw',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					password: password,
					returnSecureToken: true,
				}),
			}
		);

		if (!response.ok) {
			const errorResData = await response.json();
			const errorId = errorResData.error.message;
			let message = 'OOPS!!!';
			if (errorId === 'EMAIL_NOT_FOUND') {
				message = 'Email could not be found!';
			} else if (errorId === 'INVALID_PASSWORD') {
				message = 'This password is not valid!';
			}
			throw new Error(message);
		}

		const resData = await response.json();
		console.log('Login', resData.email);
		dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
	};
};

export const logout = () => {
	return { type: LOGOUT };
};
