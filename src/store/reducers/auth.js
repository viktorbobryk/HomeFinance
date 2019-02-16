import {AUTH_SUCCESS, AUTH_LOGOUT, ACTIVE_USER, LOADING} from '../actions/actionTypes';
const initialState = {
    loading: true,
    token: null,
    activeUser: null
};

export default function authReducer(state = initialState, action) {

    switch (action.type) {
        case AUTH_SUCCESS: return{
            ...state, token: action.token
        };
        case AUTH_LOGOUT:
            return {
                ...state, token: null, activeUser: null
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