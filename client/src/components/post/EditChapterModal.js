import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  setChapter,
  clearChapter,
  updateChapter,
} from '../../actions/postActions';
import ReactMde from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const EditChapterModal = ({ post, updateChapter }) => {
  const [header, setHeader] = useState('');
  const [mdText, setmdText] = useState('');
  const [selectedTab, setSelectedTab] = useState('write');

  useEffect(() => {
    if (post.loading !== true && post.chapter !== null) {
      setHeader(post.chapter.header);
      setmdText(converter.makeMarkdown(post.chapter.text));
    }
  }, [post]);

  const onClose = () => {
    clearChapter();
  };
  const onChange = (e) => {
    setHeader(e.target.value);
  };

  const onClick = async () => {
    const postFields = {
      header: header,
      text: converter.makeHtml(mdText),
    };
    updateChapter(postFields, post.chapter._id, post.post._id);
  };

  return (
    <Fragment>
      <div
        id='edit-chapter-modal'
        className='modal fade'
        data-backdrop='static'
        data-keyboard='false'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='staticBackdropLabel'
        aria-hidden='true'>
        <div className='modal-dialog  modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add story</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
                onClick={onClose}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='form-group'>
                <label htmlFor='storyTitle'>Story's title</label>
                <input
                  type='text'
                  className='form-control'
                  id='storyTitle'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={header}
                />
              </div>

              <div className='container'>
                <ReactMde
                  value={mdText}
                  onChange={setmdText}
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                  }
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
                onClick={onClose}>
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
                aria-label='Close'
                onClick={onClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { updateChapter })(EditChapterModal);
