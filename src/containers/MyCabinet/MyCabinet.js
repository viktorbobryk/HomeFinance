import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom'
import {logout} from '../../store/actions/auth'
import {fetchUserData} from "../../store/actions/myCabinet";
import classes from './MyCabinet.scss';
import Earnings from '../../components/Earnings/Earnings';
import Salary from '../../components/Salary/Salary';
import Spending from '../../components/Spending/Spending';
import Others from '../../components/Others/Others';


const arr = [<Earnings/>, <Salary/>, <Spending/>, <Others/>];
let child = arr[0];

class MyCabinet extends Component {


  componentDidMount(){
      this.props.fetchUserData()
  }

    clickHandler = (id)=>{
      let index = id;
      child = arr[index];
      console.log(index);
      // console.log(arr[index]);
    };

  render() {
      const path = this.props.match.path;
      let links = [
          {to: `${path}/earnings`, label: 'earnings', exact: true, id: 0},
          {to: `${path}/salary`, label: 'salary', exact: false, id: 1},
          {to: `${path}/spending`, label: 'spending', exact: false,id: 2},
          {to: `${path}/other`, label: 'other1', exact: false, id: 3},
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
            <div className={classes.userInfo}>Save your money with Home Finance &trade;<span>userName</span> <span><i className="fas fa-user-circle fa-2x"></i></span></div>
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

function mapDispatchToProps(dispatch){
  return{
    logout: ()=> dispatch(logout()),
    fetchUserData:()=> dispatch(fetchUserData())
  }
}
export default connect(null, mapDispatchToProps)(MyCabinet);