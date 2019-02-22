import React, {Component} from 'react';
import classes from './Earnings.scss';
import Loader from '../../components/UI/Loader/Loader';
import Table from '../../components/UI/Table/Table';
import UserForm from '../../components/UI/UserForm/UserForm';
import {showEarnings, fetchUsersData, sortedData} from "../../store/actions/myCabinet";
import is from 'is_js';
import {connect} from 'react-redux';
import _ from 'lodash';
import Pagination from '../../components/UI/Pagination/Pagination';
import axios from '../../axios/axios';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select'

class Earnings extends Component {

    state = {
        isLoading: true,
        isFormValid: false,
        earningSum: 0,
        earningDate: new Date(),
        earningCategory: 'salary',
        sortTo: 'asc',
        sortField: 'earningDate',
        currentPage: 0,
        formControls: {
            sum: {
                value: '',
                type: 'number',
                label: 'Number',
                errorMessage: 'Enter valid number',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    number: true
                }
            },
            date: {
                value: '',
                type: 'date',
                label: 'Date',
                errorMessage: 'Enter valid date',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    date: true
                }
            },
        }
    };


    addEarningHandler = async (event)=>{
        console.log('addEarningHandler', event);
        event.preventDefault();
        const state = {...this.state};
        console.log(this.props.activeUser);
        const userData = {
            userId: 8,
            user: this.props.activeUser,
            earningSum: state.earningSum,
            earningDate: state.earningDate,
            earningCategory: state.earningCategory
        };
        const formControls = state.formControls;

        Object.keys(formControls).forEach(name => {
            Object.keys(formControls[name]).forEach(val =>{
                if(val === 'value'){
                    formControls[name][val] = ''
                }
            });
        });

        await axios.post('/earnings.json', userData);
        this.setState({
            isFormValid: false,
            earningSum: 0,
            earningDate: userData.earningDate,
            earningCategory: 'salary',
        });
    };
    submitHandler = (event)=>{
        console.log('submitHandler', event);
        event.preventDefault();
    };
    validateControl= (value, validation)=> {

        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.number) {
            isValid = is.truthy(+value) && isValid
        }
        if (validation.date) {
            isValid = is.truthy(value) && isValid
        }

        return isValid
    };
    onChangeHandler = (event, controlName) => {
            const formControls = { ...this.state.formControls };
            const control = { ...formControls[controlName] };
            let userInput = event.target.value;

            control.value = event.target.value;
            control.touched = true;
            control.valid = this.validateControl(control.value, control.validation);

            formControls[controlName] = control;

            let isFormValid = true;



            Object.keys(formControls).forEach(name => {
                isFormValid = formControls[name].valid && isFormValid
            });
            if(event.target.type === 'number'){
                this.setState({
                    formControls: formControls,
                    isFormValid: isFormValid,
                    earningSum: userInput,
                    user: this.props.activeUser
                })
            }
            if(event.target.type === 'date'){
                this.setState({
                    formControls: formControls,
                    isFormValid: isFormValid,
                    earningDate: userInput,
                    user: this.props.activeUser
                })
            }

    };
    selectChangeHandler = event => {
        this.setState({
            earningCategory: event.target.value
        })
    };
    showEarningHandler = (val) =>{
        this.props.showEarnings(val);
        this.props.fetchUsersData()
    };
    renderInputs = ()=> {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    };
    onSort = (sortField)=>{
        const data = this.props.data;
        const sortType = this.state.sortTo === 'asc' ? 'desc' : 'asc';
        const orderedData = _.orderBy(data, sortField, sortType);

        this.props.sortedData(orderedData);
        this.setState({
            sortTo: sortType,
            sortField: sortField
        })
    };
    pageChangeHandler = (selected)=>{
        console.log(selected);
        this.setState({
            currentPage: selected
        })
    };
  render() {
      const tableSize = 5;
      const select = <Select
          label="Choose category"
          value={this.state.earningCategory}
          required="required"
          onChange={this.selectChangeHandler}
          options={[
              {text: 'salary', value: 'salary'},
              {text: 'pension', value: 'pension'},
              {text: 'dividends', value: 'dividends'},
              {text: 'bribe', value: 'bribe'}
          ]}
      />;

      let formContent;

      if(!this.props.earnings){
          formContent = <UserForm
              onSubmit={()=>this.submitHandler}
              renderInputs={()=>this.renderInputs()}
              select={select}
              type="primary"
              onClick={()=>this.addEarningHandler}
              disabled={!this.state.isFormValid}
          />
          // formContent = <form onSubmit={this.submitHandler}>
          //
          //     { this.renderInputs() }
          //
          //     { select }
          //
          //     <Button
          //         type="primary"
          //         onClick={this.addEarningHandler}
          //         disabled={!this.state.isFormValid}
          //     >
          //         Add earning
          //     </Button>
          // </form>
      }
      if(this.props.earnings){
          // const displayData = _.chunk(this.props.data, tableSize)[0];
          formContent =
              <Table
                  data={this.props.data}
                  onSort={this.onSort}
                  sort={this.state.sortTo}
                  sortField={this.state.sortField}
              />
      }

    return (
      <div className={classes.Earnings}>
          <div className={classes.earningsHeader}>
              <Button
                  type={!this.props.earnings ? "activeHeader" : 'header'}
                  onClick={()=>this.showEarningHandler(false)}
              >
                  create earning
              </Button>
              <Button
                  type={this.props.earnings ? "activeHeader" : 'header'}
                  onClick={()=>this.showEarningHandler(true)}
              >
                  show earnings
              </Button>
          </div>
          {
              this.props.loading ?
                  <Loader/>
                  :
                  formContent
          }
          {
              (this.props.earnings)
              ?
                  <Pagination
                      onPageChange={this.pageChangeHandler}
                  />
          : null
          }
      </div>
    );
  }
}
 function mapStateToProps(state){
    return{
         activeUser: state.auth.activeUser,
         earnings: state.myCabinet.showEarnings,
         loading: state.auth.loading,
         data: state.myCabinet.usersData
     }
 }

function mapDispatchToProps(dispatch){
    return{
        showEarnings: (val)=> dispatch(showEarnings(val)),
        fetchUsersData: ()=> dispatch(fetchUsersData()),
        sortedData: (data)=> dispatch(sortedData(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Earnings);