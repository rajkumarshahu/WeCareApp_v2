import { LOGIN, SIGNUP, LOGOUT } from '../reducers/logInSignUp';

const initialState = {
	token: null,
	userId: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				token: action.token,
				userId: action.userId,
			};
		case SIGNUP:
			return {
				token: action.token,
				userId: action.userId,
			};
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};

export const logout = () => {
	return { type: LOGOUT };
};
