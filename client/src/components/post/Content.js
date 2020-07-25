import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { getChapter, clearChapter } from '../../actions/postActions';
import { FormattedMessage } from 'react-intl';

const Content = ({ posta, post, getChapter, clearChapter, auth }) => {
  return (
    <Fragment>
      <ul className='list-group' style={{ cursor: 'pointer' }}>
        <li
          className=' list-group-item-primary list-group-item'
          onClick={() => {
            clearChapter();
          }}>
          {post.header}
        </li>
        {post.chapters.map((chapter) => (
          <li
            key={chapter._id}
            className={
              posta.chapter === null
                ? 'list-group-item '
                : posta.chapter._id !== chapter._id
                ? 'list-group-item'
                : 'list-group-item list-group-item-warning'
            }
            onClick={() => {
              clearChapter();
              getChapter(chapter);
            }}>
            {chapter.header}
            <div>
              <span className='badge  badge-secondary'>
                <FormattedMessage
                  id='Content.likes-badge'
                  defaultMessage='Likes: '
                />
                <span className='badge badge-light'>
                  {' ' + chapter.likes.length}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
      {auth.user !== null && auth.user._id === post.user && (
        <button
          type='button'
          className='btn btn-primary btn-sm mt-3'
          data-target='#add-chapter-modal'
          data-toggle='modal'>
          <FormattedMessage
            id='content.addChapter-btn'
            defaultMessage='Add Chapter'
          />
        </button>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  posta: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getChapter, clearChapter })(Content);
