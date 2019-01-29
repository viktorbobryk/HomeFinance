import React, {Component} from 'react';
import classes from './Footer.scss'

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={classes.Footer}>
                <h2>Footer</h2>
            </div>
        );
    }
}

export default Footer;