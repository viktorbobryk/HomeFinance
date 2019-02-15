import React from 'react'
import classes from './Button.scss'

const Button = (props)=>{
    const cls = [
        classes.Button,
        classes[props.type]
    ];
    return (
        <button
            id={props.id}
            onClick={props.onClick}
            disabled={props.disabled}
            className={cls.join(' ')}
        >
            {props.children}
        </button>
    )
};
export default Button;