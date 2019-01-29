import React from 'react';
import classes from './Input.scss'

const isValid = ({valid, touched, shouldValidate})=>{
    return !valid && shouldValidate && touched
};

const Input = (props) => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if(isValid(props)){
        cls.push(classes.invalid)
    }
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            />
            {
                isValid(props) ? <span>{props.errorMessage || 'enter right value'}</span> : null
            }

        </div>
    );
};

export default Input;