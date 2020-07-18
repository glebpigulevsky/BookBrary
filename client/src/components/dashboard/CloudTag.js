import React from 'react';
import PropTypes from 'prop-types';
import { TagCloud } from 'react-tagcloud';
import { connect } from 'react-redux';
import { filterPostsTag, clearFilter } from '../../actions/postActions';

const CloudTag = ({ tags, filterPostsTag, clearFilter }) => {
  const skipFilter = () => {
    clearFilter();
  };
  return (
    <div>
      {tags !== null && !tags.loading && (
        <div className='card mb-3' style={{ width: '20rem' }}>
          <div className='card-header text-center'>
            Filter by Tags
            <a
              href='#!'
              className='badge badge-warning d-inline ml-2'
              onClick={skipFilter}>
              Skip
            </a>
          </div>
          <div className='card-body'>
            <TagCloud
              minSize={14}
              maxSize={20}
              tags={tags.tags}
              className='tagPointer'
              onClick={(tag) => filterPostsTag(tag.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

CloudTag.propTypes = {
  filterPostsTag: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tags: state.tags,
});

export default connect(mapStateToProps, { filterPostsTag, clearFilter })(
  CloudTag
);
