import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getPost,
  addRating,
  setPost,
  deletePost,
} from '../../actions/postActions';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import Comments from './Comments';
import moment from 'moment';
import 'moment/locale/ru';

import { FormattedMessage } from 'react-intl';
import Content from './Content';

const Post = ({
  match,
  getPost,
  post: { post, loading, chapter },
  auth,
  addRating,
  setPost,
  deletePost,
  history,
}) => {
  const [rating, setRating] = useState('');
  useEffect(() => {
    getPost(match.params.id);
    if (post !== null && post.averageRating !== null)
      setRating(post.averageRating);
    // eslint-disable-next-line
  }, []);

  const onDelete = () => {
    deletePost(post._id);
    history.push('/personal-page');
  };

  const onEdit = () => {
    setPost(post);
  };

  const ratingChange = (value) => {
    setRating(value);
    value = { rating: value };
    addRating(value, post._id);
  };

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-9'>
          <div className='d-flex justify-content-between align-items-center'>
            {auth.user !== null &&
              !auth.loading &&
              post !== null &&
              auth.user._id === post.user && (
                <div
                  className='btn-group mb-3'
                  role='group'
                  aria-label='Basic example'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    data-toggle='modal'
                    data-target='#edit-post-modal'
                    onClick={onEdit}>
                    <FormattedMessage
                      id='post.editPost-btn'
                      defaultMessage='Edit'
                    />
                  </button>

                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={onDelete}>
                    <FormattedMessage
                      id='post.deletePost-btn'
                      defaultMessage='Delete'
                    />
                  </button>
                </div>
              )}
            {auth.user !== null &&
              !auth.loading &&
              post !== null &&
              !loading &&
              auth.user._id === post.user && (
                <Rating
                  emptySymbol='far fa-star fa-1x yellow'
                  fullSymbol='fas fa-star  fa-1x yellow'
                  fractions={2}
                  value={rating}
                  initialRating={post.averageRating}
                  onChange={ratingChange}
                />
              )}
          </div>

          {post !== null && chapter === null ? (
            <div className='card mb-3'>
              <h5 className='card-header'>{post.header}</h5>
              <img
                src={'../image/' + post.postImage}
                className='card-img-top'
                alt='...'
              />
              <div className='card-body'>
                <div
                  className='card-text'
                  dangerouslySetInnerHTML={{ __html: post.text }}></div>
                <p className='card-text'>
                  <small className='text-muted'>
                    {moment(post.date)
                      .locale(localStorage.getItem('lang'))
                      .fromNow()}
                  </small>
                </p>
              </div>
            </div>
          ) : (
            chapter !== null && (
              <div className='card'>
                <h5 className='card-header'>{chapter.header}</h5>
                <img
                  src={'../image/' + chapter.postImage}
                  className='card-img-top'
                  alt='...'
                />
                <div className='card-body'>
                  <div
                    className='card-text'
                    dangerouslySetInnerHTML={{ __html: chapter.text }}></div>
                </div>
              </div>
            )
          )}
          {auth.user !== null && !auth.loading && <Comments />}
        </div>
        <div className='col-md-3'>
          <h4>
            <FormattedMessage
              id='post.contentHeader-text'
              defaultMessage='Content'
            />
          </h4>
          {post !== null && <Content post={post} />}
        </div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  addRating: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  addRating,
  setPost,
  deletePost,
})(Post);
