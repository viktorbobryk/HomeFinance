import React, {useState} from 'react';   //import hook "useState" for working with state in stateless component.
                                         // It is available in react version 16.7.0-alpha.2 and react-dom version 16.7.0-alpha.2
                                         // update your app to these versions or higher
import classes from './SearchByDate.scss';
import Button from '../Button/Button';

const SearchByDate = (props) => {
    const [valueMin, setValueMin] = useState('');
    const [valueMax, setValueMax] = useState('');
    // const [disable, setDisable] = useState(false);

    const valueChangeHandlerMin = (event)=>{
        setValueMin(event.target.value)
    };
    const valueChangeHandlerMax = (event)=>{
        setValueMax(event.target.value)
    };
    return (
        <div className={classes.SearchByDate} style={{display: props.show ? 'flex' : 'none',
            backgroundColor: props.show ? '#a1f045' : 'white' }}>

            <div className={classes.filterBy}>
                <label>From
                    <input type="date"
                           name="from"
                           value={valueMin}
                           onChange={valueChangeHandlerMin}
                    />
                </label>
                <label>To
                    <input type="date"
                           name="to"
                           value={valueMax}
                           onChange={valueChangeHandlerMax}
                    />
                </label>
                <Button
                    onClick={()=> {props.onSearch(new Date(valueMin), new Date(valueMax));  setValueMin(""); setValueMax("")}}
                    disabled={!(valueMin.length && valueMax.length)}
                >Search</Button>
            </div>
        </div>
    );
};

export default SearchByDate;