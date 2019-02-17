import React, {Component} from 'react';
import classes from './Earnings.scss';
import Loader from '../../components/UI/Loader/Loader';
import Table from '../../components/UI/Table/Table';
import {showEarnings, fetchUsersData} from "../../store/actions/myCabinet";
import is from 'is_js';
import {connect} from 'react-redux';
import axios from '../../axios/axios';
import Button from  '../../components/UI/Button/Button';
import Input from  '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select'

class Earnings extends Component {
     componentDidMount(){
        this.props.fetchUsersData();
    }

    state = {
         isLoading: true,
        isFormValid: false,
        earningSum: null,
        earningDate: null,
        earningCategory: 'salary',
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
        event.preventDefault();
        const state = {...this.state};
        const userData = {
            user: state.user,
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
        console.log('earningSum:', userData.earningSum);
        console.log('earningSDate:', userData.earningDate);
        console.log('earningCategory:', userData.earningCategory);
        this.setState({
            isFormValid: false,
            earningSum: '',
            earningDate: '',
            earningCategory: '',
        });
    };
    submitHandler = (event)=>{
        event.preventDefault();
        this.setState({
            isFormValid: false,
            earningSum: '',
            earningDate: '',
            earningCategory: '',
        });
    };
    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.number) {
            isValid = is.existy(value) && isValid
        }
        if (validation.date) {
            isValid = is.existy(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
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
                    earningSum: +userInput,
                    user: this.props.activeUser
                })
            }
            if(event.target.type === 'date'){
                this.setState({
                    formControls: formControls,
                    isFormValid: isFormValid,
                    earningDate: new Date(userInput),
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
    renderInputs() {
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
    }
  render() {
      const select = <Select
          label="Choose category"
          value={this.state.earningCategory}
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
          formContent = <form onSubmit={this.submitHandler}>

              { this.renderInputs() }

              { select }

              <Button
                  type="primary"
                  onClick={this.addEarningHandler}
                  disabled={!this.state.isFormValid}
              >
                  Add earning
              </Button>
          </form>
      }
      if(this.props.earnings){
          formContent = <Table data={this.props.data}/>
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
        fetchUsersData: ()=> dispatch(fetchUsersData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Earnings);