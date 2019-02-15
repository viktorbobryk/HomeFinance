import {SAVE_USER, EARNINGS} from '../actions/actionTypes';
const initialState = {
    users: null,
    showEarnings: false
};


export default function myCabinetReducer(state = initialState, action) {
// console.log(action.payload);
    switch (action.type) {
        case SAVE_USER: return{
            ...state, users: action.payload
        };
        case EARNINGS: return{
            ...state, showEarnings: action.payload
        };
        default:
            return state
    }
}