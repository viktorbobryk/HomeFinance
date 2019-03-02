import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink, withRouter} from 'react-router-dom'
import {logout} from '../../store/actions/auth'
import {fetchUsers} from "../../store/actions/myCabinet";
import {activeUser, deleteUser} from "../../store/actions/auth";
import {closeModalError} from '../../store/actions/modal'
import classes from './MyCabinet.scss';
import Earnings from '../Earnings/Earnings';
 import Spending from '../Spending/Spending';
import Charts from '../../components/Charts/Charts';
import Others from '../../components/Others/Others';
import ModalError from '../../components/UI/ModalError/ModalError';
import ModalInfo from '../../components/UI/ModalInfo/ModalInfo'
import Button from "../../components/UI/Button/Button";

const arr = [<Earnings/>, <Spending/>, <Charts/>, <Others/>];

let child = arr[0];

class MyCabinet extends Component {
    state = {
        show: false
    };

   componentDidMount(){
      this.props.fetchUsers();
      this.props.getActiveUser();
   }

    clickHandler = (id)=>{
      child = arr[id];
    };
    toggleModalInfoHandler = ()=>{
        console.log(this.state.show);
        this.setState({
            show: !this.state.show
        })
    };

  render() {
      const path = this.props.match.path;
      let links = [
          {to: `${path}/earnings`, label: 'earnings', exact: true, id: 0},
          {to: `${path}/spending`, label: 'spending', exact: true,id: 1},
          {to: `${path}/charts`, label: 'charts', exact: true, id: 2},
          {to: `${path}/other`, label: 'other', exact: true, id: 3},
      ];


          let renderLinks=()=>{

          return links.map((link, index)=>{
              return(
                  <li key={index}>
                      <NavLink
                          className={(this.props.location.pathname === '/my-cabinet' && link.id === 0) ? classes.activeLink : null}
                          to={link.to}
                          exact={link.exact}
                          activeClassName={classes.active}
                          onClick={()=>{this.clickHandler(link.id)}}
                      >
                          {link.label}
                      </NavLink>
                  </li>
              )
          })
      };
    return (
        <div className={classes.Mycabinet}>
            <ModalError
                showModal={this.props.show}
                modalClosed={this.props.closeModalError}
            >{this.props.message}</ModalError>
            <ModalInfo
                message="Your account will be deleted!!!"
                answer='Do you want to continue?'
                show={this.state.show}
                deleteUser={this.props.deleteUser}
                toggleView={this.toggleModalInfoHandler}
            />
            <div className={classes.userInfo}>Manage your family budget with Home Finance &trade;<span>{this.props.activeUser}</span> <span><i className="fas fa-user-circle fa-2x"></i></span><Button type='error' onClick={this.toggleModalInfoHandler}>Delete account</Button></div>
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
        activeUser: state.auth.activeUser,
        data: state.myCabinet.usersData,
        show: state.modal.show,
        message: state.modal.message
    }
}

function mapDispatchToProps(dispatch){
  return{
    logout: ()=> dispatch(logout()),
    fetchUsers:()=> dispatch(fetchUsers()),
    getActiveUser: ()=> dispatch(activeUser()),
    closeModalError: ()=> dispatch(closeModalError()),
    deleteUser: ()=>dispatch(deleteUser())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyCabinet));