import React, {Component} from 'react';
import  classes from './Header.scss'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


class Header extends Component {
    render() {
        const left = classes.left;
        const right = classes.right;

        let links = [
            {to: '/', label: 'Home', exact: true, className: `${left}`},
            {to: '/about-us', label: 'About Us', exact: false, className: `${left}`},
            {to: '/blog', label: 'Blog', exact: false, className: `${left}`},
            {to: '/registration', label: 'Signup', exact: false, className: `${right}`},
            {to: '/login', label: 'Login', exact: false, className: `${right}`},


        ];
        if(this.props.registered){
            links = [
                {to: '/', label: 'Home', exact: true, className: `${left}`},
                {to: '/about-us', label: 'About Us', exact: false, className: `${left}`},
                {to: '/blog', label: 'Blog', exact: false, className: `${left}`},
                {to: '/my-cabinet', label: 'My cabinet', exact: false, className: `${left}`},
                {to: '/logout', label: 'Logout', exact: false, className: `${right}`}
            ];
        }
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
            <React.Fragment>
                <div className={classes.Header}>
                    <h1>Home Finance</h1>
                    <nav>
                        <ul>
                            {renderLinks()}
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