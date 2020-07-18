import React from 'react';
import moment from 'moment';

const CommentItem = ({ comment }) => {
  const time = comment.date;
  return (
    <div>
      <li className='d-flex justify-content-between mb-4'>
        <div className='chat-body white p-3 ml-2 z-depth-1'>
          <div className='header'>
            <strong className='primary-font'>{comment.name}</strong>
            <small className='pull-right text-muted ml-2'>
              <i className='far fa-clock'></i> {moment(time).fromNow()}
            </small>
          </div>
          <hr className='w-100' />
          <p className='mb-0'>{comment.text}</p>
        </div>
      </li>
    </div>
  );
};

export default CommentItem;
