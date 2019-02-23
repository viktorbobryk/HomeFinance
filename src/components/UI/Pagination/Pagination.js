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
             pageCount={props.pageCount}
             marginPagesDisplayed={2}
             pageRangeDisplayed={5}
             onPageChange={props.pageChangeHandler}
             containerClassName={classes.pagination}
             activeClassName={classes.active}
             pageClassName={classes.pageItem}
             pageLinkClassName={classes.pageLink}
             previousClassName={classes.pageItem}
             nextClassName={classes.pageItem}
             previousLinkClassName={classes.pageLink}
             nextLinkClassName={classes.pageLink}
             forcePage={props.currentPage}
          />
      </div>
  );
};

export default Pagination;