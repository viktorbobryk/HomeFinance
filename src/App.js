import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect}from 'react-redux';
import Home from './containers/Home/Home'
import MyCabinet from './containers/MyCabinet/MyCabinet'
import Auth from './containers/Auth/Auth'
import AboutUs from './containers/AboutUs/AboutUs'
import './App.scss';
import {autoLogin} from './store/actions/auth';

class App extends Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/about-us' component={AboutUs}/>
                <Route path='/auth' component={Auth}/>
                <Route path='/my-cabinet' component={MyCabinet}/>
            </Switch>
        </Layout>
    );
  }
}

function mapStateToProps(state) {
    console.log(state.auth.token);
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
