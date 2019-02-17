import React from 'react';
import classes from './table.scss'

const Table = (props) => {
    console.log(props);
    if((props.data === undefined || props.data === null)){
        return <h2>you have not added any earnings yet</h2>;
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