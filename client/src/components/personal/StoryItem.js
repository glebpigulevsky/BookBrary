import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { deletePost, setPost, addRating } from '../../actions/postActions';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Rating from 'react-rating';
import moment from 'moment';

const StoryItem = ({ story, deletePost, setPost, post, auth, addRating }) => {
  const notify = () => {
    toast('Story deleted');
  };

  const [didLoad, setLoad] = React.useState(false);

  const style = didLoad ? {} : { display: 'none' };
  const styleSpinner = didLoad ? { display: 'none' } : {};

  const { _id, header, averageRating, tags } = story;
  const onDelete = () => {
    deletePost(_id);
    notify();
  };
  const onEdit = () => {
    setPost(story);
  };
  const ratingChange = (value) => {
    value = { rating: value };
    addRating(value, story._id);
  };

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <div className='card mt-3  w-90'>
        <div
          className='spinner-border mx-auto'
          role='status'
          style={styleSpinner}>
          <span className='sr-only'>Loading...</span>
        </div>
        <div style={style}>
          <h5 className='card-header  text-center'>{header}</h5>
          <img
            src={'/image/' + story.postImage}
            className='card-img-top'
            alt='...'
            onLoad={() => setLoad(true)}
          />
          <div className='card-img-overlay d-flex  flex-column  justify-content-between'>
            <div className='mt-5 d-flex align-items-end flex-column '>
              <div className='rounded p-1 opacity-1  pl-2  pr-2'>
                <Rating
                  emptySymbol='far fa-star fa-1x yellow'
                  fullSymbol='fas fa-star  fa-1x yellow'
                  fractions={2}
                  initialRating={averageRating}
                  onChange={ratingChange}
                />
              </div>
              <div className='rounded p-1 opacity-1 text-white mt-1 pl-2  pr-2'>
                <i className='fas fa-genderless'></i>
                {' ' + story.genre}
              </div>
              <div className='rounded p-1 opacity-1 text-white mt-1 pl-2 pr-2'>
                {'Comments: '}
                <span className='badge badge-light'>
                  {' ' + story.comments.length}
                </span>
              </div>
              <div className='rounded p-1 opacity-1 text-white mt-1 pl-2 pr-2'>
                {'Added: '}
                <span className='badge badge-light'>
                  {' ' + moment(story.date).fromNow()}
                </span>
              </div>
            </div>

            <div className='d-flex justify-content-between mb-5'>
              <Link
                className='nav-link  btn-link border bg-primary text-white  btn-sm rounded border-primary'
                to={`/post/${_id}`}>
                Read more...
              </Link>
              <Fragment>
                {auth.user !== null && auth.user._id === story.user && (
                  <div>
                    <button
                      type='button'
                      className='btn btn-primary mr-2 btn-sm'
                      data-toggle='modal'
                      data-target='#edit-post-modal'
                      onClick={onEdit}>
                      Edit
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger btn-sm'
                      onClick={onDelete}>
                      Delete
                    </button>
                  </div>
                )}
              </Fragment>
            </div>
          </div>
        </div>
        <div className='card-footer text-muted'>
          {tags.map((tag) => (
            <span className='badge badge-secondary mr-1' key={tag._id}>
              {tag.value}
            </span>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

StoryItem.propTypes = {
  story: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  setPost: PropTypes.func.isRequired,
  addRating: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, setPost, addRating })(
  StoryItem
);
