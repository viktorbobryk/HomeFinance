import React, {useState} from 'react';   //import hook "useState" for working with state in stateless component.
                                         // It is available in react version 16.7.0-alpha.2 and react-dom version 16.7.0-alpha.2
                                         // update your app to these versions or higher
import classes from './TableSearch.scss';
import Button from '../Button/Button';

const TableSearch = (props) => {
    const [value, setValue] = useState('');
    const valueChangeHandler = (event)=>{
        setValue(event.target.value)
    };
  return (
    <div className={classes.TableSearch}>
        <Button
            onClick={()=> props.onSearch(value)}
        >Search</Button>
        <input
            type="text"
            name="search"
            onChange={valueChangeHandler}
            value={value}
        />
    </div>
  );
};

export default TableSearch;