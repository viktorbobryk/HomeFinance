import axios from '../../axios/axios';
import {SAVE_USER} from './actionTypes';

export function fetchUserData() {

    return async (dispatch, getState) => {
        const res = await axios.get('/users.json');
        dispatch(saveUsers(res.data));
        // console.log(res.data);
    }
}
export function saveUsers(data){
    return {
        type: SAVE_USER,
        payload: data

    }
}