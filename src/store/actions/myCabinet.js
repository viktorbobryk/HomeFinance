import axios from '../../axios/axios';
export function fetchUserData() {

    return async (dispatch, getState) => {
        const res = await axios.get('/users.json');
        console.log(res.data);

    }
}