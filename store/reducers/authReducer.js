import { LOGIN, SIGNUP } from '../actions/authAction';

const initialState = {
    token: null,
    userId: null
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state;
    }
}

export default AuthReducer;