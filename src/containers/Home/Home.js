import React, {Component} from 'react';
import {connect} from 'react-redux';
import Loader from '../../components/UI/Loader/Loader';
import  classes from './Home.scss';

class Home extends Component {

  state = {

  };

  render() {
    return (
        <div>
            <h2 className={classes.header}>Home</h2>
            {
                this.props.loading
                    ? <Loader />
                    : <div>Content</div>
            }
        </div>

    );
  }
}

function mapStateToProps(state){
    return {
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps)(Home);