import {combineReducers} from 'redux';
import myCabinetReducer from './myCabinet';
import authReducer from './auth'

export default combineReducers({
        myCabinet: myCabinetReducer,
        auth: authReducer
    }
)