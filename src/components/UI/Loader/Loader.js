import React from 'react';
import classes from './Loader.scss'

const Loader = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>


    );
};

export default Loader;