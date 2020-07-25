import React, { useEffect, Fragment, useRef } from 'react';
import { connect } from 'react-redux';
import {
  getPosts,
  filterPosts,
  clearFilter,
  clearChapter,
  clearPost,
} from '../../actions/postActions';
import PropTypes from 'prop-types';
import StoryItem from '../personal/StoryItem';
import Spinner from '../layout/Spinner';
import CloudTag from './CloudTag';
import SortArea from './SortArea';

const Dashboard = ({
  post: { filtered, loading, posts },
  getPosts,
  filterPosts,
  clearFilter,
  clearChapter,
  clearPost,
}) => {
  const text = useRef('');
  useEffect(() => {
    getPosts();
    clearChapter();
    clearPost();
    if (filtered === null) {
      text.current.value = '';
    }
    //eslint-disable-next-line
  }, [filtered]);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPosts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Fragment>
      <div className='d-flex justify-content-between align-items-end mb-5'>
        <CloudTag />
        <div className='md-form mt-0 ml-3 d-flex'>
          <input
            ref={text}
            className='form-control mr-2 '
            type='text'
            placeholder={
              localStorage.getItem('lang') === 'en' ? 'Search...' : 'Поиск...'
            }
            aria-label='Search'
            onChange={onChange}
          />
          <SortArea />
        </div>
      </div>

      <div className='row row-cols-1 row-cols-md-2 mb-5'>
        {posts !== null && !loading ? (
          filtered !== null ? (
            filtered.map((story) => (
              <div className='col mb-4' key={story._id}>
                <StoryItem key={story._id} story={story} />
              </div>
            ))
          ) : (
            posts.map((story) => (
              <div className='col mb-4' key={story._id}>
                <StoryItem key={story._id} story={story} />
              </div>
            ))
          )
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getPosts: PropTypes.func.isRequired,
  filterPosts: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
  clearChapter: PropTypes.func.isRequired,
  clearPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPosts,
  filterPosts,
  clearFilter,
  clearChapter,
  clearPost,
})(Dashboard);
