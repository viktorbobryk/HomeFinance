import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect}from 'react-redux';
import Home from './containers/Home/Home'
import MyCabinet from './containers/MyCabinet/MyCabinet'
import Auth from './containers/Auth/Auth'
import AboutUs from './containers/AboutUs/AboutUs'
import './App.scss';

class App extends Component {

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

function mapStateToProps(state){
    return{
        smth: state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(App));
