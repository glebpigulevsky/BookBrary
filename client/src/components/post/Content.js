import React, { Fragment, useeffect } from 'react';

import { connect } from 'react-redux';
import { getChapter, clearChapter } from '../../actions/postActions';
import { FormattedMessage } from 'react-intl';

const Content = ({ posta, post, getChapter, clearChapter }) => {
  const onClick = (chapter) => {
    console.log(chapter);
  };
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
            className={
              posta.chapter === null
                ? 'list-group-item '
                : posta.chapter._id !== chapter._id
                ? 'list-group-item'
                : 'list-group-item list-group-item-warning'
            }
            onClick={() => {
              getChapter(chapter);
            }}>
            {chapter.header}
          </li>
        ))}
      </ul>
      <button type='button' className='btn btn-primary btn-sm mt-3'>
        <FormattedMessage
          id='Content.addChapter-btn'
          defaultMessage='Add Chapter'
        />
      </button>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  posta: state.post,
});

export default connect(mapStateToProps, { getChapter, clearChapter })(Content);
