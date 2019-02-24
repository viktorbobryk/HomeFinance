import React, {Component} from 'react';
import {connect}from 'react-redux'
import Auth from '../Auth/Auth';
import Modal from '../../components/UI/Modal/Modal'
import {closeModal, showModal} from "../../store/actions/modal";

class Registration extends Component {

    state = {

    };
    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        this.props.showModal(error);
    }
    render() {
        return (
            <React.Fragment>
                <Modal
                    show={this.props.show}
                    closeModal={this.props.closeModal}
                >{this.props.message}</Modal>
                <Auth
                    isLogin={false}/>
                {/*<button onClick={()=>this.props.showModal('aaaaaaaaaaaaaaaqaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')}>show modal</button>*/}
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
        showModal: (message)=> dispatch(showModal(message))
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(Registration);