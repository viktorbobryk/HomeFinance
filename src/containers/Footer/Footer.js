import React, {Component} from 'react';
import classes from './Footer.scss';
import {NavLink} from 'react-router-dom'

class Footer extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render() {

        let links = [
            {to: '/', label: 'Home', exact: true},
            {to: '/about-us', label: 'About Us', exact: false},
            {to: '/blog', label: 'Blog', exact: false},
            {to: '/privacy', label: 'Privacy policy', exact: false},
            {to: '/terms', label: 'Terms of use', exact: false},
            {to: '/faq', label: 'FAQ', exact: false},
            {to: '/registration', label: 'Signup', exact: false},
            {to: '/login', label: 'Login', exact: false},


        ];
        let renderLinks=()=>{
            return links.map((link, index)=>{
                return(
                    <li key={index} className={link.className}>
                        <NavLink
                            to={link.to}
                            exact={link.exact}
                            className={links.className}
                            activeClassName={classes.active}
                            onClick={this.clickHandler}
                        >
                            {link.label}
                        </NavLink>
                    </li>
                )
            })
        };
        return (
            <div className={classes.Footer}>
                <nav>
                    <ul>
                        {renderLinks()}
                    </ul>
                </nav>
                &copy; {new Date().getFullYear()} &nbsp; Povered by VVN
            </div>
        );
    }
}

export default Footer;