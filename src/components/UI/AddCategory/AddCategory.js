import React from 'react';
import classes from './AddCategory.scss';
import Button from '../../../components/UI/Button/Button'

const AddCategory= (props) => {
    // console.log(props);
    return (
        <div className={classes.addCategory} style={{transform: props.show ? 'translateX(0)' : 'translateX(204px)',
            zIndex: props.addCategory ? 10 : 0
        }}
        >

            <form onSubmit={props.submit} style={{width: '100%'}}>
                Enter new category
                <input type="text" onChange={props.changeCategory} value={props.categoryValue}/>
                <Button
                    type='primary'
                    onClick={props.addCategory}
                    disabled={props.disabled}
                >
                    Add category
                </Button>
            </form>
            <span  onClick={()=>props.toggleAddCategory()} className={classes.toggleView}>{props.show ? 'hide': 'add category'}</span>
        </div>
    )
};

export default AddCategory;
