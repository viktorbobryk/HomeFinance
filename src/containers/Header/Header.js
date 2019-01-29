import React, {Component} from 'react';
// import Login from '../Login/Login'
import  classes from './Header.scss'
import {NavLink} from 'react-router-dom'

const links = [
    {to: '/', label: 'Home', exact: true},
    {to: '/about-us', label: 'About Us', exact: false},
    {to: '/my-cabinet', label: 'My cabinet', exact: false},
    {to: '/auth', label: 'Authentication', exact: false}
];
class Header extends Component {
    renderLinks=()=>{
        return links.map((link, index)=>{
            return(
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    };
    render() {
        return (
            <React.Fragment>
                <div className={classes.Header}>
                    <h1>Home Finance</h1>
                    <nav>
                        <ul>
                            {this.renderLinks()}
                        </ul>
                    </nav>
                </div>

            </React.Fragment>
        );
    }
}

export default Header;