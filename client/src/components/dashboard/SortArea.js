import React from 'react';
import { connect } from 'react-redux';
import { filterPostsDate, filterPostsRating } from '../../actions/postActions';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const SortArea = ({ filterPostsDate, filterPostsRating }) => {
  const filterByDate = () => filterPostsDate();
  const filterByRating = () => filterPostsRating();
  return (
    <div className='mt-1'>
      <a
        href='#!'
        className='badge badge-secondary d-inline ml-2'
        onClick={filterByDate}>
        <FormattedMessage
          id='sortArea.newestBadge-cloudTag'
          defaultMessage='Newest'
          description='Btn to sort as newest'
        />
      </a>
      <a
        href='#!'
        className='badge badge-secondary d-inline ml-2'
        onClick={filterByRating}>
        <FormattedMessage
          id='sortArea.popularBadge-cloudTag'
          defaultMessage='Popular'
          description='Btn to sort as popular'
        />
      </a>
    </div>
  );
};
SortArea.propTypes = {
  filterPostsDate: PropTypes.func.isRequired,
  filterPostsRating: PropTypes.func.isRequired,
};

export default connect(null, { filterPostsDate, filterPostsRating })(SortArea);
