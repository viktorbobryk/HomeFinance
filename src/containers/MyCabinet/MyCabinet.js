import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/auth'
import {fetchUserData} from "../../store/actions/myCabinet";

class MyCabinet extends Component {

  componentDidMount(){
      this.props.fetchUserData()
  }

  render() {
    // console.log(this.props);
    return (
        <div>
            <h2>MyCabinet</h2>
          <button onClick={this.props.logout}>logout</button>
            {/*<button onClick={this.props.fetchUserData}>fetch user data</button>*/}
        </div>

    );
  }
}
function mapDispatchToProps(dispatch){
  return{
    logout: ()=> dispatch(logout()),
    fetchUserData:()=> dispatch(fetchUserData())
  }
}
export default connect(null, mapDispatchToProps)(MyCabinet);