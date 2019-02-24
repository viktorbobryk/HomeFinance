import {combineReducers} from 'redux';
import myCabinetReducer from './myCabinet';
import authReducer from './auth';
import modalReducer from './modal';

export default combineReducers({
        myCabinet: myCabinetReducer,
        auth: authReducer,
        modal: modalReducer
    }
)