import React from 'react';
import Button from '../Button/Button';

const UserForm = (props) => {
  return (
      <form onSubmit={props.submitHandler}>

          { props.renderInputs() }

          { props.select }

          <Button
              type={props.type}
              onClick={props.addMoneyHandler}
              disabled={props.disabled}
              id={props.id}
          >
              {props.typeMoney}
          </Button>
      </form>
  );
};

export default UserForm;