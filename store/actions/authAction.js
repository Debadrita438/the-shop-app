export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDVSb0tGBfH5gT_l3y_MSdCRbSg-pw5Ra8',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application.json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })        
            }
        );

        if(!response.ok) {
            const errResData = await response.json();
            const errorId = errResData.error.message;
            let message = 'Something went wrong';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email already exists already!'
            }

            throw new Error(message);
        }

        const resData = await response.json();
        
        dispatch({
            type: SIGNUP,
            token: resData.idToken,
            userId: resData.localId
        })
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDVSb0tGBfH5gT_l3y_MSdCRbSg-pw5Ra8',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application.json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })        
            }
        );

        if(!response.ok) {
            const errResData = await response.json();
            const errorId = errResData.error.message;
            let message = 'Something went wrong';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'This password is not valid!'
            }

            throw new Error(message);
        }

        const resData = await response.json();
        dispatch({
            type: LOGIN,
            token: resData.idToken,
            userId: resData.localId
        })
    }
}