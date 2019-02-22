import React from 'react';
import Button from '../Button/Button';

const UserForm = (props) => {
    // const submittHandler = (event)=>{
    //     props.dispatch(props.submitHandler);
    //     event.preventDefault();
    // };
  return (
      <form onSubmit={props.submittHandler}>

          { props.renderInputs() }

          { props.select }

          <Button
              type={props.type}
              onClick={props.addEarningHandler}
              disabled={props.isFormValid}
          >
              Add earning
          </Button>
      </form>
  );
};

export default UserForm;