import {SAVE_USER} from '../actions/actionTypes';
const initialState = {
    users: null
};


export default function myCabinetReducer(state = initialState, action) {
    switch (action.type) {
        case SAVE_USER: return{
            ...state, users: action.payload
        };
        default:
            return state
    }
}