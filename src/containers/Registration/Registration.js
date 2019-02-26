import React, {Component} from 'react';
import {connect}from 'react-redux';
import Auth from '../Auth/Auth';
import ModalError from '../../components/UI/ModalError/ModalError';
import {closeModal} from "../../store/actions/modal";

class Registration extends Component {

    state = {

    };
    render() {
        return (
            <React.Fragment>
                <ModalError
                    show={this.props.show}
                    closeModal={this.props.closeModal}
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
        closeModal: ()=> dispatch(closeModal()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(Registration);