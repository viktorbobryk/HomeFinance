import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS, ACTIVE_USER, LOADING} from './actionTypes';

export function auth(email, password, isRegistration) {
    return async dispatch => {
        const authData = {
            email, password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAmPD6vG0-Moyw2c61U9IcaV54OLzAF4oo';

        if (isRegistration) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAmPD6vG0-Moyw2c61U9IcaV54OLzAF4oo';
        }

        try{
            const response = await axios.post(url, authData);
            const data = response.data;
            const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('userId', data.localId);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(activeUser(email));
            dispatch(authSuccess(data.idToken));
            dispatch(autoLogout(data.expiresIn));
            if(isRegistration){
                dispatch(createUser(authData.email, authData.password))
            }
        }
        catch(e){
            console.log(e);
            alert('user with such mail is already registered')
        }


    }
}

export function activeUser(email){
    let userEmail = email;
    if(email){
        localStorage.setItem('activeUser', email);
    }else{
        userEmail = localStorage.getItem('activeUser');
    }

    return {
        type: ACTIVE_USER,
        payload: userEmail
    }
}

export function createUser(email, password) {
    const user = {
        name: email,
        password: password
    };
    return async () => {
        try{
            await axios.post('https://homefinance-4beab.firebaseio.com//users.json', user);
            alert('created new user ' + user.name)
        }
        catch(e){
            console.log(e);
        }

    }
}
export function autoLogout(time) {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('activeUser');
    return {
        type: AUTH_LOGOUT
    }
}


export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}
export function loading(val) {
    return {
        type: LOADING,
        payload: val
    }
}