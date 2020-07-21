import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getComment, sendComment } from '../../actions/postActions';
import moment from 'moment';
import CommentItem from './CommentItem';

const Comments = ({ post, auth, getComment, sendComment }) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  //const socket = io();
  const socket = io.connect('http://localhost:5000');
  useEffect(() => {
    if (post.post !== null) {
      setComments(post.post.comments);
    }
    socket.on('Output Chat Message', (comment) => {
      getComment(comment);
    });
    return () => {
      socket.off('Output Chat Message');
    };
  }, [post, socket, getComment]);

  const sendMessage = () => {
    const comment = {
      post: post.post._id,
      user: auth.user._id,
      text: message,
      time: moment(),
    };
    //addComment(comment, post.post._id);
    socket.emit('Input Chat Message', comment);
    sendComment();
    setMessage('');
  };

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div className='col-md-6 col-xl-8 pl-md-3 px-lg-auto px-0'>
        <div className='chat-message'>
          <ul className='list-unstyled chat'>
            {post.post !== null &&
              post.post.comments !== null &&
              comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            <li className='white'>
              <div className='form-group basic-textarea d-flex'>
                <div>
                  <textarea
                    className='form-control pl-2 my-0'
                    id='exampleFormControlTextarea2'
                    rows='3'
                    value={message}
                    onChange={onChange}
                    placeholder='Type your comment here...'></textarea>
                </div>

                <div className='ml-2'>
                  <button
                    type='button'
                    className='btn btn-info btn-rounded btn-sm waves-effect waves-light float-right'
                    onClick={sendMessage}>
                    Send
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </div>
  );
};

Comments.propTypes = {
  getComment: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getComment, sendComment })(Comments);
