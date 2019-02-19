import {AUTH_SUCCESS, AUTH_LOGOUT, ACTIVE_USER, LOADING} from '../actions/actionTypes';
const initialState = {
    loading: true,
    registered: false,
    activeUser: null
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case AUTH_SUCCESS: return{
            ...state, registered: true
        };
        case AUTH_LOGOUT:
            return {
                ...state, registered: false, activeUser: null
            };
        case ACTIVE_USER:
            return {
                ...state,  activeUser: action.payload
            };
        case LOADING:
            return {
                ...state,  loading: action.payload
            };
        default:
            return state
    }
}