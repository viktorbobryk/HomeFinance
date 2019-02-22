import React from 'react';
import Button from '../Button/Button';

const UserForm = (props) => {
  return (
      <form onSubmit={props.submitHandler}>

          { props.renderInputs() }

          { props.select }

          <Button
              type={props.type}
              onClick={props.addEarningHandler}
              disabled={props.disabled}
          >
              Add earning
          </Button>
      </form>
  );
};

export default UserForm;