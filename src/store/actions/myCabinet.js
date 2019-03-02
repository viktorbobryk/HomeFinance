import axios from '../../axios/axios';
import {SAVE_USER, SAVE_USER_DATA, EARNINGS, SPENDING, SORTED_DATA} from './actionTypes';
import {loading} from '../actions/auth';
import {showModal} from '../actions/modal';

export function fetchUsers(){

    return async (dispatch) => {
        try{
            const res = await axios.get('/users.json');
            dispatch(saveUsers(res.data));
        }
        catch(error){
            console.log(error.message);
            dispatch(showModal(error.message));
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
export function showSpending(val) {
    return {
        type: SPENDING,
        payload: val
    }
}
export function fetchUsersData(val) {
    if(val === 'earnings'){
        return async (dispatch) => {
            try{
                const res = await axios.get('/earnings.json');
                dispatch(saveUsersData(res.data));
                dispatch(loading(false));
            }
            catch(error){
                console.log(error.message);
                dispatch(showModal(error.message));
            }
        }
    }
    if(val === 'spending'){
        return async (dispatch) => {
            try{
                const res = await axios.get('/spending.json');
                dispatch(saveUsersData(res.data));
                dispatch(loading(false));
            }
            catch(error){
                console.log(error.message);
                dispatch(showModal(error.message));
            }
        }
    }
}
export function sortedData(data) {
    return{
        type: SORTED_DATA,
        payload: data
    }
}
export function postEarningCategories(data) {
    return async (dispatch) => {
        try{
          await axios.put('/earningCategories.json', data);
        }
        catch(error){
            console.log(error.message);
            dispatch(showModal(error.message));
        }
    }
}
export function postSpendingCategories(data) {
    return async (dispatch) => {
        try{
            await axios.put('/spendingCategories.json', data);
        }
        catch(error){
            console.log(error.message);
            dispatch(showModal(error.message));
        }
    }
}