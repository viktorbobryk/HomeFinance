import React from 'react';
import classes from './DeleteCategory.scss';
import Button from '../../../components/UI/Button/Button'

const DeleteCategory= (props) => {
    // console.log(props.categories);
    const list = props.categories.map((category, index)=>{
       return(
           <li key={index}>{category.value}{<Button type='error' onClick={(e)=>props.deleteCategory(index)}>delete</Button>}</li>
       )
    });
    return (
        <div className={classes.DeleteCategory} style={{transform: props.show ? 'translateX(0)' : 'translateX(204px)',
            zIndex: props.show ? 10 : 0
        }}
        >
            <h3>Choose category</h3>
            <ul>
                {list}
            </ul>
            <span  onClick={()=>props.toggleDeleteCategory()} className={classes.toggleView}>{props.show ? 'hide': 'delete category'}</span>
        </div>
    )
};

export default DeleteCategory;
