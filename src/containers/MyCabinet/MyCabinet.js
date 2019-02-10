import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import {logout} from '../../store/actions/auth'
import {fetchUserData} from "../../store/actions/myCabinet";
import {activeUser} from "../../store/actions/auth"
import classes from './MyCabinet.scss';
import Earnings from '../../components/Earnings/Earnings';
import Salary from '../../components/Salary/Salary';
import Spending from '../../components/Spending/Spending';
import Charts from '../../components/Charts/Charts';
import Others from '../../components/Others/Others';

const arr = [<Earnings/>, <Salary/>, <Spending/>, <Charts/>, <Others/>];
let child = null;


class MyCabinet extends Component {


  componentDidMount(){
      this.props.fetchUserData();
      this.props.getActiveUser();
  }

    clickHandler = (id)=>{
      child = arr[id];
    };

  render() {
      const path = this.props.match.path;
      let links = [
          {to: `${path}/earnings`, label: 'earnings', exact: true, id: 0},
          {to: `${path}/salary`, label: 'salary', exact: false, id: 1},
          {to: `${path}/spending`, label: 'spending', exact: false,id: 2},
          {to: `${path}/charts`, label: 'charts', exact: false, id: 3},
          {to: `${path}/other`, label: 'other', exact: false, id: 4},
      ];


          let renderLinks=()=>{
          return links.map((link, index)=>{
              return(
                  <li key={index} className={link.className}>
                      <NavLink
                          to={link.to}
                          exact={link.exact}
                          className={links.className}
                          activeClassName={classes.active}
                          onClick={()=>this.clickHandler(link.id)}
                      >
                          {link.label}
                      </NavLink>
                  </li>
              )
          })
      };
    return (
        <div className={classes.Mycabinet}>
            <div className={classes.userInfo}>Manage your family budget with Home Finance &trade;<span>{this.props.activeUser}</span> <span><i className="fas fa-user-circle fa-2x"></i></span></div>
            <nav>
                <ul>
                    {renderLinks()}
                </ul>
            </nav>
            <div className={classes.userContent}>{child}</div>
        </div>

    );
  }
}

function mapStateToProps(state){
    return{
        users: state.myCabinet.users,
        activeUser: state.auth.activeUser
    }
}
function mapDispatchToProps(dispatch){
  return{
    logout: ()=> dispatch(logout()),
    fetchUserData:()=> dispatch(fetchUserData()),
    getActiveUser: ()=> dispatch(activeUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyCabinet);