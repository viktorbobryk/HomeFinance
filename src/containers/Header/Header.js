import React, {Component} from 'react';
import  classes from './Header.scss'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


class Header extends Component {
    render() {
        let linksLeft = [
            {to: '/', label: 'Home', exact: true},
            {to: '/about-us', label: 'About Us', exact: false},
            {to: '/blog', label: 'Blog', exact: false}
        ];
        let linksRight = [
            {to: '/login', label: 'Login', exact: false},
            {to: '/registration', label: 'Signup', exact: false}
        ];
        if(this.props.registered){
            linksLeft = [
                {to: '/', label: 'Home', exact: true},
                {to: '/about-us', label: 'About Us', exact: false},
                {to: '/blog', label: 'Blog', exact: false},
                {to: '/my-cabinet', label: 'My cabinet', exact: false},
            ];
            linksRight = [
                {to: '/logout', label: 'Logout', exact: false}
            ];
        }
        let renderLinksLeft=()=>{
            return linksLeft.map((link, index)=>{
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
        let renderLinksRight=()=>{
            return linksRight.map((link, index)=>{
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
        return (
            <React.Fragment>
                <div className={classes.Header}>
                    <h1>Home Finance</h1>
                    <nav>
                        <ul>
                            {renderLinksLeft()}
                        </ul>
                        <ul>
                            {renderLinksRight()}
                        </ul>
                    </nav>
                </div>

            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {

    return {
        registered: state.auth.registered

    }
}
export default connect(mapStateToProps, null, null,
    { pure: false })(Header);