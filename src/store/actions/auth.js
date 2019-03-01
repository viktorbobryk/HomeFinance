import {AUTH_LOGOUT, AUTH_SUCCESS, ACTIVE_USER, LOADING} from './actionTypes';
import firebaseRef from '../../firebase/firebase';
import {showModal} from './modal'

export function registration(email, password){
    return async dispatch => {
        try{
            await firebaseRef.auth().createUserWithEmailAndPassword(email, password);
            dispatch(authSuccess());
            dispatch(activeUser(firebaseRef.auth().currentUser.email));
        }
        catch(error){
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/weak-password') {
            // alert('The password is too weak.');
              dispatch(showModal('auth/weak-password'));
          } else {
            // alert(errorMessage);
              dispatch(showModal(errorMessage));
          }
          console.log(error);
            dispatch(showModal(errorMessage));
        }
  }
}

export function login(email, password){
    return async dispatch => {
        try{
            await firebaseRef.auth().signInWithEmailAndPassword(email, password);
            const expiresIn = 3600;
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            localStorage.setItem('expirationDate', expirationDate);

            dispatch(activeUser(firebaseRef.auth().currentUser.email));
            dispatch(authSuccess());
            dispatch(autoLogout(expiresIn));
        }
        catch(error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    // alert('Wrong password.');
                    console.log('Wrong password');
                    dispatch(showModal('Wrong password.'));
                } else {
                    console.log(errorMessage);
                    // alert(errorMessage);
                    dispatch(showModal(errorMessage));
                }
                console.log(error);
                dispatch(showModal(errorMessage));
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

export function autoLogout(time) {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const userEmail = localStorage.getItem('userEmail');
        const userPassword = localStorage.getItem('userPassword');
        if (!userEmail || !userPassword) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout())
            }
            else {
                dispatch(authSuccess());
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
              }
         }
    }
}

export function authSuccess() {
    return {
        type: AUTH_SUCCESS
    }
}
export function loading(val) {
    return {
        type: LOADING,
        payload: val
    }
}
export function deleteUser() {
    return async dispatch => {
        try{
            await firebaseRef.auth().currentUser.delete();
            dispatch(logout());
        }
        catch(e){
            console.log(e);
            dispatch(showModal(e.message));
        }
    };

}
