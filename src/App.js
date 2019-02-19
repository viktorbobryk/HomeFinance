import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch,  Redirect, withRouter} from 'react-router-dom';
import {connect}from 'react-redux';
import Home from './containers/Home/Home'
import MyCabinet from './containers/MyCabinet/MyCabinet'
import AboutUs from './containers/AboutUs/AboutUs'
import Login from './containers/Login/Login'
import Blog from './containers/Blog/Blog'
import Logout from './containers/Logout/Logout'
import Registration from './containers/Registration/Registration'
import './App.scss';
import {autoLogin} from './store/actions/auth';

class App extends Component {

    componentDidMount() {
        this.props.autoLogin();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/about-us' component={AboutUs}/>
                <Route path='/blog' component={Blog}/>
                <Route path='/login' component={Login}/>
                <Route path='/registration' component={Registration}/>
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/about-us' component={AboutUs}/>
                    <Route path='/blog' component={Blog}/>
                    <Route path='/my-cabinet' component={MyCabinet}/>
                    <Route path='/logout' component={Logout}/>
                    <Redirect to="/my-cabinet" />
                </Switch>
            );

        }
    return (
        <Layout>
            {routes}
        </Layout>
    );
  }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.registered
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
