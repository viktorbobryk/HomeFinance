import React, {Component} from 'react';
import classes from './Earnings.scss';
import Loader from '../../components/UI/Loader/Loader';
import Table from '../../components/UI/Table/Table';
import TableSearch from '../../components/UI/TableSearch/TableSearch';
import UserForm from '../../components/UI/UserForm/UserForm';
import {showEarnings, fetchUsersData, sortedData} from "../../store/actions/myCabinet";
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
import {closeModal, showModal} from "../../store/actions/modal";
import {postCategories} from "../../store/actions/myCabinet"

class Earnings extends Component {
    async componentDidMount(){
        const categories = await axios.get('/categories.json');
        console.log('categories->', categories.data);
        this.setState({
            selectOptions: categories.data
        })
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
            {text: 'salary', value: 'salary', user: ''},
            {text: 'pension', value: 'pension', user: ''},
            {text: 'dividends', value: 'dividends', user: ''},
            {text: 'bribe', value: 'bribe', user: ''}
        ],
        search: '',
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
        const newCategory = {text: this.state.categoryValue, value: this.state.categoryValue};
        categoryList.push(newCategory);
        const res = categoryList.map((category)=>{
            return(
                {text: category.text, value: category.value, user: this.props.activeUser}
            )
        });
        this.props.postCategories(res);
        this.setState({
            selectOptions: res,
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
        this.props.postCategories(categoryList)
    };
    searchHandler = (search)=>{
        this.setState({search, currentPage: 0});
    };
    getFilteredData = ()=>{
        const search = this.state.search;
        const data = this.props.data ? Object.values(this.props.data) :[];

        if(!search){
            return data;
        }
        if(data.length < 1){
            return data;
        }
         return data.filter((item)=>{
             return item['earningCategory'].toLowerCase().includes(search.toLowerCase())
         })

    };
  render() {
      let formContent;
      const tableSize = 10;
      let filteredData = [];
      const selectOptions = this.props.selectOptions ? this.props.selectOptions : this.state.selectOptions;
      const select = <Select
          label="Choose category"
          value={this.state.earningCategory}
          required="required"
          onChange={this.selectChangeHandler}
          options={selectOptions}
      />;

      if(!this.props.earnings){
          formContent = <UserForm
              submitHandler={this.submitHandler}
              renderInputs={()=>this.renderInputs()}
              select={select}
              type="primary"
              addEarningHandler={this.addEarningHandler}
              disabled={!this.state.isFormValid}
          />
      }
      if(this.props.earnings){
          filteredData = this.getFilteredData();
          const displayData = _.chunk(filteredData, tableSize)[this.state.currentPage];
          formContent = this.props.loading ?
              <Loader/>
              :
              <>
                  <TableSearch
                    onSearch={this.searchHandler}
                  />
                  <Table
                      data={displayData}
                      onSort={this.onSort}
                      sort={this.state.sortTo}
                      sortField={this.state.sortField}
                  />
              </>
      }
      const pageCount = Math.ceil(filteredData.length / tableSize);
      console.log(filteredData);

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
              closeModal={this.props.closeModal}
          >{this.props.message}</ModalError>
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
        fetchUsersData: ()=> dispatch(fetchUsersData()),
        sortedData: (data)=> dispatch(sortedData(data)),
        closeModal: ()=> dispatch(closeModal()),
        showModal: (error)=> dispatch(showModal(error)),
        postCategories: (data)=> dispatch(postCategories(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);