import React, {Component} from 'react';
import Auth from '../Auth/Auth'

class Login extends Component {

  state = {

  };

  render() {
    return (
      <Auth
      isLogin={true}
      />
    );
  }
}
export default Login;