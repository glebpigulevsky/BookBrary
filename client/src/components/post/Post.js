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

const Post = ({
  match,
  getPost,
  post: { post, loading },
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
                Edit
              </button>

              <button
                type='button'
                className='btn btn-danger'
                onClick={onDelete}>
                Delete
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

      {post !== null && (
        <div className='card mb-3'>
          <img
            src={'image/' + post.postImage}
            className='card-img-top'
            alt='...'
          />
          <div className='card-body'>
            <h5 className='card-title'>{post.header}</h5>
            <div
              className='card-text'
              dangerouslySetInnerHTML={{ __html: post.text }}></div>
            <p className='card-text'>
              <small className='text-muted'>Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      )}
      <Comments />
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
