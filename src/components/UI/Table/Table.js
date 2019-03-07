import React from 'react';
import classes from './Table.scss';

const Table = (props) => {
    if((props.data === undefined || props.data === null)){
        return <h2>you have not added any {props.type}</h2>;
    }
    if(props.type === 'earnings'){
        return (
            <table className={classes.table}>
                <thead>
                <tr>
                    <th onClick={()=>props.onSort('index')}>
                        id{props.sortField === 'index' ? <small>&nbsp;{props.sort}</small> : null}
                    </th>
                    <th onClick={()=>props.onSort('earningDate')}>
                        Date{props.sortField === 'earningDate' ? <small>&nbsp;{props.sort === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>} </small> : null}
                    </th>
                    <th onClick={()=>props.onSort('earningSum')}>
                        Sum{props.sortField === 'earningSum' ? <small>&nbsp;{props.sort === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>}</small> : null}
                    </th>
                    <th onClick={()=>props.onSort('earningCategory')}>
                        Category{props.sortField === 'earningCategory' ? <small>&nbsp;{props.sort === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>}</small> : null}
                    </th>
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
    }
    if(props.type === 'spending'){
        return (
            <table className={classes.table}>
                <thead>
                <tr>
                    <th onClick={()=>props.onSort('index')}>
                        id{props.sortField === 'index' ? <small>&nbsp;{props.sort}</small> : null}
                    </th>
                    <th onClick={()=>props.onSort('spendingDate')}>
                        Date{props.sortField === 'spendingDate' ? <small>&nbsp;{props.sort === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>} </small> : null}
                    </th>
                    <th onClick={()=>props.onSort('spendingSum')}>
                        Sum{props.sortField === 'spendingSum' ? <small>&nbsp;{props.sort === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>}</small> : null}
                    </th>
                    <th onClick={()=>props.onSort('spendingCategory')}>
                        Category{props.sortField === 'spendingCategory' ? <small>&nbsp;{props.sort === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>}</small> : null}
                    </th>
                </tr>
                </thead>
                <tbody>
                {Object.values(props.data).map((item, index) => (

                    <tr key={index}>
                        <td>{index}</td>
                        <td>{item.spendingDate}</td>
                        <td>{item.spendingSum}</td>
                        <td>{item.spendingCategory}</td>
                    </tr>
                ))}
                </tbody>
            </table>


        );
    }

};

export default Table;