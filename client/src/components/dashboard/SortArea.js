import React from 'react';
import { connect } from 'react-redux';
import { filterPostsDate, filterPostsRating } from '../../actions/postActions';
import PropTypes from 'prop-types';

const SortArea = ({ filterPostsDate, filterPostsRating }) => {
  const filterByDate = () => filterPostsDate();
  const filterByRating = () => filterPostsRating();
  return (
    <div className='mt-1'>
      <a
        href='#!'
        className='badge badge-secondary d-inline ml-2'
        onClick={filterByDate}>
        Newest
      </a>
      <a
        href='#!'
        className='badge badge-secondary d-inline ml-2'
        onClick={filterByRating}>
        Popular
      </a>
    </div>
  );
};
SortArea.propTypes = {
  filterPostsDate: PropTypes.func.isRequired,
  filterPostsRating: PropTypes.func.isRequired,
};

export default connect(null, { filterPostsDate, filterPostsRating })(SortArea);
