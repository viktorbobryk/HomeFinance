import axios from '../../axios/axios';
export function fetchUserData() {

    return async (dispatch, getState) => {
         await axios.get('/users.json');
    }
}