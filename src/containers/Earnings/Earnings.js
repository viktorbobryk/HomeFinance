import React, {Component} from 'react';
import classes from './Earnings.scss';
import Loader from '../../components/UI/Loader/Loader';
import Table from '../../components/UI/Table/Table';
import SearchByCategory from '../../components/UI/SearchByCategory/SearchByCategory';
import SearchByDate from '../../components/UI/SearchByDate/SearchByDate';
import SearchBySum from '../../components/UI/SearchBySum/SearchBySum';
import UserForm from '../../components/UI/UserForm/UserForm';
import {showEarnings, fetchEarnings, sortedData} from "../../store/actions/myCabinet";
import is from 'is_js';
import {connect} from 'react-redux';
import _ from 'lodash';
import Pagination from '../../components/UI/Pagination/Pagination';
import axios from '../../axios/axios';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import ModalError from '../../components/UI/ModalError/ModalError';
import AddCategory from '../../components/UI/AddCategory/AddCategory';
import DeleteCategory from '../../components/UI/DeleteCategory/DeleteCategory'
import {closeModalError, showModal} from "../../store/actions/modal";
import {postEarningCategories} from "../../store/actions/myCabinet"

class Earnings extends Component {

    async componentDidMount(){
        const categories = await axios.get('/earningCategories.json');
        if(categories.data != null){
            this.setState({
                selectOptions: categories.data
            })
        }
        document.getElementById('clicked').click();
    }

    state = {
        isLoading: false,
        isFormValid: false,
        earningSum: 0,
        earningDate: new Date(),
        earningCategory: 'salary',
        sortTo: 'asc',
        sortField: 'earningDate',
        currentPage: 0,
        showAddCategory: false,
        showDeleteCategory: false,
        categoryValue: '',
        disabled: true,
        selectOptions: [
            {text: 'salary', value: 'salary', user: 'all'},
            {text: 'pension', value: 'pension', user: 'all'},
            {text: 'dividends', value: 'dividends', user: 'all'},
            {text: 'bribe', value: 'bribe', user: 'all'}
        ],
        searchByValue: '',
        showCategoryFilter: false,
        showDateFilter: false,
        showSumFilter: false,
        formControls: {
            sum: {
                value: '',
                type: 'number',
                label: 'Sum',
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
            user: this.props.activeUser,
            earningSum: state.earningSum,
            earningDate: state.earningDate,
            earningCategory: state.earningCategory
        };
        const formControls = this.state.formControls;

        Object.keys(formControls).forEach(name => {
            Object.keys(formControls[name]).forEach(val =>{
                if(val === 'value'){
                    formControls[name][val] = ''
                }
            });
        });
        this.setState({
            isLoading: true,
        });
        try{
            await axios.post('/earnings.json', userData);
            this.setState({
                isFormValid: false,
                earningSum: 0,
                earningDate: userData.earningDate,
                earningCategory: 'salary',
                isLoading: false,
            });
        }
        catch(error){
          console.log(error.message);
          this.props.showModal(error.message)
        }

    };
    submitHandler = (event)=>{
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
        this.props.fetchEarnings()
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
    pageChangeHandler = (page)=>{
        this.setState({
            currentPage: page.selected
        })
    };
    toggleAddCategoryHandler = ()=>{
        this.setState({
            showAddCategory: !this.state.showAddCategory
        })
    };
    toggleDeleteCategoryHandler = ()=>{
        this.setState({
            showDeleteCategory: !this.state.showDeleteCategory
        })
    };
    changeCategoryHandler = (event)=>{
        this.setState({
            categoryValue: event.target.value,
            disabled: false
        })
    };
    addCategoryHandler = ()=>{
        const categoryList = [...this.state.selectOptions];
        const newCategory = {text: this.state.categoryValue, value: this.state.categoryValue, user: this.props.activeUser};
        categoryList.push(newCategory);
        this.props.postEarningCategories(categoryList);
        this.setState({
            selectOptions: categoryList,
            categoryValue: '',
            disabled: true
        });
    };
    deleteCategoryHandler = (index)=>{
        const categoryList = this.state.selectOptions;
        categoryList.splice(index, 1);
        this.setState({
            selectOptions: categoryList
        });
        this.props.postEarningCategories(categoryList)
    };
    searchByValueHandler = (...args)=>{
        this.setState({searchByValue: args, currentPage: 0});
    };
    getFilteredData = ()=>{
        const search = this.state.searchByValue;
        const data = this.props.data ? Object.values(this.props.data) : [];
        if(!search){
            return data;
        }
        if(search.length < 1){
            return data;
        }
        if(search.length === 1){
            return data.filter((item)=>{
                return item['earningCategory'].toLowerCase().includes(search[0].toLowerCase())
            })
        }
        if(search.length === 2){
            console.log(typeof(search[0]));
            if(typeof(search[0]) === 'string'){
                return data.filter((item)=>{
                    return item['earningSum'] >= search[0] && item[['earningSum']] <= search[1]
                })
            }
            if(typeof(search[0]) === 'object'){
                return data.filter((item)=>{
                    return new Date(item['earningDate']).getTime() >= search[0].getTime() && new Date(item[['earningSum']]).getTime() <= search[1].getTime()
                })
            }
        }
    };
    showFilterByCategory =()=>{
        this.setState({
            showCategoryFilter: !this.state.showCategoryFilter,
            showDateFilter: false,
            showSumFilter: false
        })
    };
    showFilterByDate =()=>{
        this.setState({
            showDateFilter: !this.state.showDateFilter,
            showCategoryFilter: false,
            showSumFilter: false
        })
    };
    showFilterBySum =()=>{
        this.setState({
            showSumFilter: !this.state.showSumFilter,
            showCategoryFilter: false,
            showDateFilter: false
        })
    };
  render() {
      let formContent;
      const tableSize = 10;
      let filteredData = [];
      const selectOptions = this.props.selectOptions ? this.props.selectOptions : this.state.selectOptions;
      console.log("selectOptions", selectOptions);
      const currentUserOptions = selectOptions.filter((option)=>{
          return (option.user === this.props.activeUser || option.user === 'all')
      });
      console.log('currentUserOptions', currentUserOptions);
      const select = <Select
          label="Choose category"
          value={this.state.earningCategory}
          required="required"
          onChange={this.selectChangeHandler}
          options={currentUserOptions}
      />;

      if(!this.props.earnings){
          formContent = <UserForm
              submitHandler={this.submitHandler}
              renderInputs={()=>this.renderInputs()}
              select={select}
              type="primary"
              addMoneyHandler={this.addEarningHandler}
              disabled={!this.state.isFormValid}
              typeMoney="Add earnings"
          />
      }
      if(this.props.earnings){
          filteredData = this.getFilteredData();
          const displayData = _.chunk(filteredData, tableSize)[this.state.currentPage];
          formContent = this.props.loading ?
              <Loader/>
              :
              <>
                  <div className={classes.SearchPanel}>
                      <div className={classes.header}>
                          <span>Fiter table data by : </span>
                          <Button type="primary" onClick={this.showFilterByCategory}>Category</Button>
                          <Button type="succsess" onClick={this.showFilterByDate}>Date</Button>
                          <Button type="error" onClick={this.showFilterBySum}>Sum</Button>
                      </div>
                      <div className={classes.content}>
                          <SearchByCategory
                              show={this.state.showCategoryFilter}
                              onSearch={this.searchByValueHandler}
                          />
                          <SearchByDate
                              show={this.state.showDateFilter}
                              onSearch={this.searchByValueHandler}
                          />
                          <SearchBySum
                              show={this.state.showSumFilter}
                              onSearch={this.searchByValueHandler}
                          />
                      </div>

                  </div>
                  <Table
                      data={displayData}
                      onSort={this.onSort}
                      sort={this.state.sortTo}
                      sortField={this.state.sortField}
                      type='earnings'
                  />
              </>
      }
      const pageCount = Math.ceil(filteredData.length / tableSize);

    return (
      <div className={classes.Earnings}>
          {
              !this.props.earnings
              ?
                  <>
                      <AddCategory
                          show={this.state.showAddCategory}
                          toggleAddCategory={this.toggleAddCategoryHandler}
                          submit={this.submitHandler}
                          changeCategory={(event)=>this.changeCategoryHandler(event)}
                          addCategory={this.addCategoryHandler}
                          categoryValue={this.state.categoryValue}
                          disabled={this.state.disabled}
                      />
                      <DeleteCategory
                          show={this.state.showDeleteCategory}
                          toggleDeleteCategory={this.toggleDeleteCategoryHandler}
                          deleteCategory={(index)=>this.deleteCategoryHandler(index)}
                          categories={this.state.selectOptions}
                          submit={this.submitHandler}
                  />
              </>
              : null

          }

          <ModalError
              show={this.props.show}
              closeModal={this.props.closeModalError}
          >{this.props.message}</ModalError>
          <div className={classes.earningsHeader}>
              <Button
                  type={!this.props.earnings ? "activeHeader" : 'header'}
                  onClick={()=>this.showEarningHandler(false)}
                  id='clicked'
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
                  formContent
          }
          {
              (this.props.earnings && filteredData.length > tableSize)
              ?
                  <Pagination
                      pageChangeHandler={this.pageChangeHandler}
                      currentPage={this.state.currentPage}
                      pageCount={pageCount}
                  />
          : null
          }
      </div>
    );
  }
}
 function mapStateToProps(state){
    console.log(state.myCabinet.usersData);
    return{
         activeUser: state.auth.activeUser,
         earnings: state.myCabinet.showEarnings,
         loading: state.auth.loading,
         data: state.myCabinet.usersData,
         show: state.modal.show,
         message: state.modal.message,
     }
 }

function mapDispatchToProps(dispatch){
    return{
        showEarnings: (val)=> dispatch(showEarnings(val)),
        fetchEarnings: ()=> dispatch(fetchEarnings()),
        sortedData: (data)=> dispatch(sortedData(data)),
        closeModalError: ()=> dispatch(closeModalError()),
        showModal: (error)=> dispatch(showModal(error)),
        postEarningCategories: (data)=> dispatch(postEarningCategories(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);