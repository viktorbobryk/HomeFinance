import React, {Component} from 'react';
import Auth from '../Auth/Auth';
import {connect}from 'react-redux';
import ModalError from '../../components/UI/ModalError/ModalError';
import {closeModal} from "../../store/actions/modal";

class Login extends Component {

  render() {
    return (
        <React.Fragment>
            <ModalError
                show={this.props.show}
                closeModal={this.props.closeModal}
            >{this.props.message}</ModalError>
            <Auth
                isLogin={true}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);