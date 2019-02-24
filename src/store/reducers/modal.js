import {SHOW_MODAL, CLOSE_MODAL} from '../actions/actionTypes';
const initialState = {
    show: false,
    message: ''
};

export default function authReducer(state = initialState, action) {
    // console.log('reducer modal message->', action.payload);
    switch (action.type) {
        case SHOW_MODAL: return{
            ...state, show: true, message: action.payload
        };
        case CLOSE_MODAL:
            return {
                ...state, show: false, message: ''
            };
        default:
            return state
    }
}