import axios from '../../axios/axios';
import {SAVE_USER, SAVE_USER_DATA, EARNINGS, SORTED_DATA} from './actionTypes';
import {loading} from '../actions/auth';

export function fetchUsers(){

    return async (dispatch) => {
        try{
            const res = await axios.get('/users.json');
            dispatch(saveUsers(res.data));
        }
        catch(e){
            console.log(e);
        }
    }
}
export function saveUsers(data){
    return {
        type: SAVE_USER,
        payload: data

    }
}
export function saveUsersData(data){
    return {
        type: SAVE_USER_DATA,
        payload: data

    }
}

export function showEarnings(val) {
    return {
        type: EARNINGS,
        payload: val
    }
}
export function fetchUsersData() {
    return async (dispatch) => {
        try{
            const res = await axios.get('/earnings.json');
            dispatch(saveUsersData(res.data));
            dispatch(loading(false));
        }
        catch(e){
            console.log(e);
        }
    }
}
export function sortedData(data) {
    return{
        type: SORTED_DATA,
        payload: data
    }
}