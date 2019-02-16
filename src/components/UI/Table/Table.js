import React from 'react';
import classes from './table.scss'

const Table = (props) => {
    if((!props)){
        props = {}
    }
  return (
      <table className={classes.table}>
          <thead>
          <tr>
              <th>id</th>
              <th>Date</th>
              <th>Sum</th>
              <th>Category</th>
          </tr>
          </thead>
          <tbody>
          {Object.values(props.data).map((item, index) => (
              <tr key={index}>
                  <td>{index}</td>
                  <td>{item.earningDate}</td>
                  <td>{item.earningSum}</td>
                  <td>{item.earningCategory}</td>
              </tr>
          ))}
          </tbody>
      </table>
  );
};

export default Table;