import React, {useState} from 'react';   //import hook "useState" for working with state in stateless component.
                                         // It is available in react version 16.7.0-alpha.2 and react-dom version 16.7.0-alpha.2
                                         // update your app to these versions or higher
import classes from './SearchBySum.scss';
import Button from '../Button/Button';

const SearchByCategory = (props) => {
    const [valueMin, setValueMin] = useState('');
    const [valueMax, setValueMax] = useState('');

    const valueChangeHandlerMin = (event)=>{
        setValueMin(event.target.value)
    };
    const valueChangeHandlerMax = (event)=>{
        setValueMax(event.target.value)
    };
    return (
        <div className={classes.SearchBySum} style={{display: props.show ? 'flex' : 'none',
                                                     backgroundColor: props.show ? '#f0576c' : 'white' }}>

            <div className={classes.filterBy}>
                <Button
                    onClick={()=> {props.onSearch(valueMin, valueMax); setValueMin(""); setValueMax("")}}
                >Search</Button>
                <label>From
                    <input type="number"
                           name="from"
                           value={valueMin}
                           onChange={valueChangeHandlerMin}
                    />
                </label>
                <label>To
                    <input type="number"
                           name="to"
                           value={valueMax}
                           onChange={valueChangeHandlerMax}
                    />
                </label>
            </div>
        </div>
    );
};

export default SearchByCategory;