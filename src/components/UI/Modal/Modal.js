import React from 'react';
import classes from './Modal.scss';

const Modal = (props) => {
// console.log(props);
    return (
        <div className={classes.Modal}
             style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                 opacity: props.show ? '1' : '0'
             }}
        >
            <div className={classes.modalHeader}>
                <span onClick={()=>props.closeModal()} className={classes.close}>&times;</span>
            </div>
            <div className={classes.modalMain}>
                {props.children}
            </div>
        </div>
    )
};

export default Modal;

// class Modal extends Component {
//     // shouldComponentUpdate (nextProps, nextState) {
//     //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
//     // }
//     render  () {
//         return (
//             <div className={classes.Modal}
//                  style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                      opacity: this.props.showModal ? '1' : '0'
//                  }}
//                 >
//                 <div className={classes.modalHeader}>
//                     <span onClick={this.props.closeModal} className={classes.close}>&times;</span>
//                 </div>
//                 <div className={classes.modalMain}>
//                     {this.props.children}
//                 </div>
//             </div>
//         )
//     }
// }
// // function mapDispatchStateToProps(state){
// //     return{
// //         showModal: state.showModal
// //     }
// // }
// function mapDispatchToProps(dispatch){
//     return{
//         closeModal: ()=> dispatch(closeModal())
//     }
// }
//export default Modal