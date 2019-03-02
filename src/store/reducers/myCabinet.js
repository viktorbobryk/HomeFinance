import {SAVE_USER, SAVE_USER_DATA, EARNINGS, SPENDING, SORTED_DATA} from '../actions/actionTypes';
const initialState = {
    users: null,
    usersData: null,
    showEarnings: false,
    showSpending: false
};

export default function myCabinetReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER: return{
            ...state, users: action.payload
        };
        case SAVE_USER_DATA: return{
            ...state, usersData: action.payload
        };
        case EARNINGS: return{
            ...state, showEarnings: action.payload
        };
        case SPENDING: return{
            ...state, showSpending:action.payload
        };
        case SORTED_DATA: return{
            ...state, usersData: action.payload
        };
        default:
            return state
    }
}