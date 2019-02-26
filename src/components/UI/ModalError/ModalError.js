import React from 'react';
import classes from './ModalError.scss';

const ModalError = (props) => {
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

export default ModalError;
