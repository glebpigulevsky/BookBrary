import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearPost, updatePost } from '../../actions/postActions';
import { ToastContainer, toast } from 'react-toastify';
import { addTag, addCount } from '../../actions/tagActions';
import { FormattedMessage } from 'react-intl';

import ReactMde from 'react-mde';
import Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

// Tags package
import CreatableSelect from 'react-select/creatable';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const EditPostModal = ({
  clearPost,
  post,
  updatePost,
  tag,
  addTag,
  addCount,
}) => {
  const notify = () => {
    toast('Story updated');
  };

  const [header, setHeader] = useState('');
  const [mdText, setmdText] = useState('');
  const [genre, setGenre] = useState('');
  const [tags, setTags] = useState([]);
  const [selectedTab, setSelectedTab] = useState('write');

  useEffect(() => {
    if (post.loading !== true && post.current !== null) {
      setHeader(post.current.header);
      setGenre(post.current.genre);
      setTags(post.current.tags);
      setmdText(converter.makeMarkdown(post.current.text));
    }
  }, [post]);

  const onChange = (e) => {
    setHeader(e.target.value);
  };

  const onClick = async () => {
    const postFields = {
      header: header,
      text: converter.makeHtml(mdText),
      genre: genre,
      tags: tags,
    };
    updatePost(post.current._id, postFields);
    onClose();
    notify();
  };

  const onClose = () => {
    clearPost();
  };

  const handleChangeSelectGenre = (e) => {
    setGenre(e.target.value);
  };

  const tagChange = (newValue, actionMeta) => {
    if (newValue.length < tags.length) {
      setTags('');
      setTags(newValue);
      return;
    }
    setTags((arr) => [...arr, newValue[newValue.length - 1]]);
    if (actionMeta.action === 'create-option') {
      addTag({ tag: newValue[newValue.length - 1].value });
    }
  };

  return (
    <Fragment>
      <ToastContainer position='bottom-right' />
      <div
        id='edit-post-modal'
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
              <h5 className='modal-title'>
                <FormattedMessage
                  id='editStoryModal.header-text'
                  defaultMessage='Edit story'
                />
              </h5>
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
                <label htmlFor='storyTitle'>
                  <FormattedMessage
                    id='addStoryModal.title-label'
                    defaultMessage='Storys title'
                  />
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='storyTitle'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                  value={header}
                />
              </div>
              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <label
                      className='input-group-text'
                      htmlFor='inputGroupSelect01'>
                      <FormattedMessage
                        id='addStoryModal.genre-label'
                        defaultMessage='Genre'
                      />
                    </label>
                  </div>
                  <select
                    className='custom-select'
                    id='inputGroupSelect01'
                    value={genre}
                    onChange={handleChangeSelectGenre}>
                    <option defaultValue>Choose...</option>
                    <option value='Fantastic'>Fantastic</option>
                    <option value='Article'>Article</option>
                    <option value='Novella'>Novella</option>
                    <option value='Horror'>Horror</option>
                    <option value='Erotic'>Erotic</option>
                    <option value='Crime'>Crime</option>
                    <option value='Fairy'>Fairy</option>
                    <option value='Historical'>Historical</option>
                    <option value='Philosophy'>Philosophy</option>
                    <option value='Scientific'>Scientific</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label htmlFor='tags'>
                  <FormattedMessage
                    id='addStoryModal.tagsTitle-label'
                    defaultMessage='Storys tags'
                  />
                </label>
                {post.loading !== true && post.current !== null && (
                  <CreatableSelect
                    defaultValue={post.current.tags}
                    options={tag !== null && !tag.loading && tag.tags}
                    id='tags'
                    onChange={tagChange}
                    isMulti
                  />
                )}
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
                <FormattedMessage
                  id='addStoryModal.closeModal-btn'
                  defaultMessage='Close'
                />
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
                aria-label='Close'
                onClick={onClick}>
                <FormattedMessage
                  id='addStoryModal.saveModal-btn'
                  defaultMessage='Save changes'
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EditPostModal.propTypes = {
  clearPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addCount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
  tag: state.tags,
});

export default connect(mapStateToProps, {
  clearPost,
  updatePost,
  addTag,
  addCount,
})(EditPostModal);
