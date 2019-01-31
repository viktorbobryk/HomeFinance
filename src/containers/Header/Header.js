import React, {Component} from 'react';
import  classes from './Header.scss'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class Header extends Component {

    render() {
        let links = [
            {to: '/', label: 'Home', exact: true},
            {to: '/about-us', label: 'About Us', exact: false},
            {to: '/auth', label: 'Authentication', exact: false},
            // {to: '/my-cabinet', label: 'My cabinet', exact: false},
        ];
        if(this.props.isAuthenticated){
            links = [
                {to: '/', label: 'Home', exact: true},
                {to: '/about-us', label: 'About Us', exact: false},
                {to: '/my-cabinet', label: 'My cabinet', exact: false},
            ];
        }
        let renderLinks=()=>{
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
    // console.log(!!state.auth.token);
    // location: state.route.location
    return {
        isAuthenticated: !!state.auth.token,
        // router: state.router,
        // location: state.route.location
    }
}
export default connect(mapStateToProps, null, null,
    { pure: false })(Header);