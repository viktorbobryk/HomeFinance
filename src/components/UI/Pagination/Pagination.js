import React from 'react';
import ReactPaginate from 'react-paginate';
import classes from './Pagination.scss'

const Pagination = (props) => {
  return (
      <div className={classes.Pagination}>
          <ReactPaginate
                         previousLabel={'<'}
                         nextLabel={'>'}
                         breakLabel={'...'}
                         breakClassName={'break-me'}
                         pageCount={5}
                         marginPagesDisplayed={2}
                         pageRangeDisplayed={5}
                         onPageChange={props.pageChangeHandler}
                         containerClassName={'pagination'}
                         activeClassName={'active'}
                         pageClassName={"page-item"}
                         pageLinkClassName={"page-link"}
                         previousClassName={"page-item"}
                         nextClassName={"page-item"}
                         previousLinkClassName={"page-link"}
                         nextLinkClassName={"page-link"}
          />
      </div>
  );
};

export default Pagination;