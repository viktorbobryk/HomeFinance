import React from 'react';
import classes from './ModalInfo.scss'
import Button from '../Button/Button'

const ModalInfo = (props) => {
  return (
    <div className={classes.ModalInfo} style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'}}>
        <h2>{props.message}</h2>
        <h3>{props.answer}</h3>
        <Button type='succsess' onClick={props.deleteUser}>Yes</Button>
        <Button type='error' onClick={props.toggleView}>No</Button>
    </div>
  );
};

export default ModalInfo;