import React, { Fragment, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './style.css';
import Spinner from '../layout/Spinner';
import {
  getUserPosts,
  filterPosts,
  clearFilter,
} from '../../actions/postActions';
import StoryItem from './StoryItem';
import PropTypes from 'prop-types';

import UserInfo from './UserInfo';
//import StoryItem from './StoryItem';

import AddBtn from '../layout/AddStoryBtn';
import SortArea from '../dashboard/SortArea';

import { FormattedMessage } from 'react-intl';

const PersonalPage = ({
  post: { posts, filtered, loading },
  getUserPosts,
  auth,
  filterPosts,
  clearFilter,
}) => {
  const text = useRef('');

  useEffect(() => {
    if (auth.user !== null) {
      getUserPosts(auth.user._id);
    }
    if (filtered === null) {
      text.current.value = '';
    }
  }, [auth, getUserPosts, filtered]);

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterPosts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <Fragment>
      <div className='Container mt-3'>
        <div className='row'>
          <h3>
            <FormattedMessage
              id='personalPage.header-text'
              defaultMessage='User Page'
              description='Header of personal page'
            />
          </h3>
        </div>

        <div className='row mt-4'>
          <div className='col-8'>
            <div className='row'>
              <div className='column'>
                <h4>
                  <FormattedMessage
                    id='personalPage.headerStories-text'
                    defaultMessage='Personal stories'
                    description='Header of stories col on personal page'
                  />
                </h4>
              </div>
              <div className='column'>
                <div className='form-group ml-5 d-flex'>
                  <input
                    ref={text}
                    type='text'
                    className='form-control'
                    id='postsFilter'
                    aria-describedby='filter post'
                    placeholder={
                      localStorage.getItem('lang') === 'en'
                        ? 'Filter Posts...'
                        : 'Поиск...'
                    }
                    onChange={onChange}
                  />
                  <SortArea />
                </div>
              </div>
            </div>

            <div
              className='border-top border-primary d-flex  flex-column align-items-center'
              style={{ borderWidth: '3px' }}>
              <Fragment>
                {posts !== null && !loading ? (
                  <div>
                    {filtered !== null
                      ? filtered.map((story) => (
                          <StoryItem key={story._id} story={story} />
                        ))
                      : posts.map((story) => (
                          <StoryItem key={story._id} story={story} />
                        ))}
                  </div>
                ) : (
                  <Spinner />
                )}
              </Fragment>
            </div>
          </div>
          <div className='col'>
            <UserInfo />
          </div>
        </div>
        <div style={{ height: '100px' }}></div>
      </div>
      <AddBtn />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
PersonalPage.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  filterPosts: PropTypes.func.isRequired,
  clearFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  getUserPosts,
  filterPosts,
  clearFilter,
})(PersonalPage);
