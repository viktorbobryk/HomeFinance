import {SHOW_MODAL, CLOSE_MODAL} from '../actions/actionTypes';

export function showModal(message){
    console.log('action modal message->', message);
    return {
        type: SHOW_MODAL,
        payload: message
    }
}
export function closeModalError(){
    return {
        type: CLOSE_MODAL
    }
}