import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  getPost,
  addRating,
  setPost,
  deletePost,
  deleteChapter,
  clearChapter,
  moveChapterDown,
  moveChapterUp,
  likeChapter,
  unlikeChapter,
  getChapter,
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
  posta,
  auth,
  addRating,
  setPost,
  deletePost,
  history,
  deleteChapter,
  clearChapter,
  moveChapterDown,
  moveChapterUp,
  likeChapter,
  unlikeChapter,
  getChapter,
}) => {
  const { post, loading, chapter } = posta;
  const [rating, setRating] = useState('');

  const [didLoad, setLoad] = useState(false);
  const style = didLoad ? {} : { display: 'none' };
  const styleSpinner = didLoad ? { display: 'none' } : {};

  useEffect(() => {
    getPost(match.params.id);
    clearChapter();

    if (post !== null && post.averageRating !== null)
      setRating(post.averageRating);
    // eslint-disable-next-line
  }, []);

  const onDelete = () => {
    deletePost(post._id);
    history.push('/personal-page');
  };

  const onEditChapter = () => {
    //setPost(post);
  };

  const onDeleteChapter = () => {
    deleteChapter(post._id, chapter._id);
  };

  const onEdit = () => {
    setPost(post);
  };

  const ratingChange = (value) => {
    setRating(value);
    value = { rating: value };
    addRating(value, post._id);
  };
  const onClickUp = () => {
    moveChapterUp(post._id, chapter._id);
  };
  const onClickDown = () => {
    moveChapterDown(post._id, chapter._id);
  };

  const likeChapterHandler = async () => {
    await likeChapter(post._id, chapter._id);
  };

  const unlikeChapterHandler = () => {
    unlikeChapter(post._id, chapter._id);
  };

  return (
    <Fragment>
      <div className='row'>
        <div className='col-md-9'>
          <div className='d-flex justify-content-between align-items-center'>
            {auth.user !== null &&
              !auth.loading &&
              post !== null &&
              auth.user._id === post.user &&
              posta.chapter === null && (
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
            {posta.chapter !== null && auth.user !== null && (
              <div className='d-flex align-items-center mb-3'>
                <div
                  className='btn-group'
                  role='group'
                  aria-label='Basic example'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    data-toggle='modal'
                    data-target='#edit-chapter-modal'
                    onClick={onEditChapter}>
                    <FormattedMessage
                      id='post.editChapter-btn'
                      defaultMessage='Edit Chapter'
                    />
                  </button>

                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={onDeleteChapter}>
                    <FormattedMessage
                      id='post.deleteChapter-btn'
                      defaultMessage='Delete chapter'
                    />
                  </button>
                </div>
                <div
                  className='ml-2 btn-group'
                  role='group'
                  aria-label='Basic example'>
                  <button
                    type='button'
                    class='btn btn-primary btn-sm'
                    disabled={posta.chapter._id === post.chapters[0]._id}
                    onClick={onClickUp}>
                    Move up <i className='fas fa-angle-up'></i>
                  </button>
                  <button
                    type='button'
                    class='btn btn-primary btn-sm'
                    disabled={
                      posta.chapter._id ===
                      post.chapters[post.chapters.length - 1]._id
                    }
                    onClick={onClickDown}>
                    Move down <i className='fas fa-angle-down'></i>
                  </button>
                </div>
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
              <div
                className='spinner-border mx-auto'
                role='status'
                style={styleSpinner}
              />
              <div style={style}>
                <h5 className='card-header'>{post.header}</h5>
                <img
                  src={'../image/' + post.postImage}
                  className='card-img-top'
                  alt='...'
                  onLoad={() => setLoad(true)}
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
            </div>
          ) : (
            chapter !== null && (
              <div className='card'>
                <div
                  className='spinner-border mx-auto'
                  role='status'
                  style={styleSpinner}
                />
                <div style={style}>
                  <h5 className='card-header'>{chapter.header}</h5>
                  <img
                    src={'../image/' + chapter.postImage}
                    className='card-img-top'
                    alt='...'
                    onLoad={() => setLoad(true)}
                  />
                  <div className='card-body'>
                    <div
                      className='card-text'
                      dangerouslySetInnerHTML={{ __html: chapter.text }}></div>
                    <div className='d-flex '>
                      <div>
                        <button
                          type='button'
                          className='btn btn-secondary btn-sm'
                          onClick={likeChapterHandler}>
                          <FormattedMessage
                            id='post.likes-btn'
                            defaultMessage='Likes: '
                          />
                          <span className='badge badge-light'>
                            {chapter.likes.length}
                          </span>
                        </button>
                      </div>

                      {chapter.likes
                        .map((like) => like.user)
                        .indexOf(auth.user._id) !== -1 && (
                        <div className='ml-2'>
                          <button
                            type='button'
                            className='btn btn-secondary btn-sm'
                            onClick={unlikeChapterHandler}>
                            <FormattedMessage
                              id='post.unlikes-btn'
                              defaultMessage='Unlike'
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
  deleteChapter: PropTypes.func.isRequired,
  clearChapter: PropTypes.func.isRequired,
  moveChapterDown: PropTypes.func.isRequired,
  moveChapterUp: PropTypes.func.isRequired,
  likeChapter: PropTypes.func.isRequired,
  unlikeChapter: PropTypes.func.isRequired,
  getChapter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posta: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  addRating,
  setPost,
  deletePost,
  deleteChapter,
  clearChapter,
  moveChapterDown,
  moveChapterUp,
  likeChapter,
  unlikeChapter,
  getChapter,
})(Post);
