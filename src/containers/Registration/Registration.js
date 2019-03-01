import React, {Component} from 'react';
import {connect}from 'react-redux';
import Auth from '../Auth/Auth';
import ModalError from '../../components/UI/ModalError/ModalError';
import {closeModalError} from "../../store/actions/modal";

class Registration extends Component {

    state = {

    };
    render() {
        return (
            <React.Fragment>
                <ModalError
                    show={this.props.show}
                    closeModal={this.props.closeModalError}
                >{this.props.message}</ModalError>
                <Auth
                    isLogin={false}/>
            </React.Fragment>

        );
    }
}
function mapStateToProps(state){
    return{
        show: state.modal.show,
        message: state.modal.message
    }
}

function mapDispatchToProps(dispatch){
    return{
        closeModalError: ()=> dispatch(closeModalError()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(Registration);