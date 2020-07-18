import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import { uploadFile } from '../../actions/fileActions';
import { getTags, addTag, addCount } from '../../actions/tagActions';
import PropTypes from 'prop-types';

import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';
import Showdown from 'showdown';

//Drop down package
import Files from 'react-butterfiles';

// Tags package
import CreatableSelect from 'react-select/creatable';

const formD = new FormData();
const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
const AddPostModal = ({
  addPost,
  uploadFile,
  tag,
  getTags,
  addTag,
  addCount,
}) => {
  const [header, setHeader] = useState('');
  const [mdText, setmdText] = useState('');
  const [file, setFile] = useState('');
  const [genre, setGenre] = useState('');
  const [selectedTab, setSelectedTab] = useState('write');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags();
    // eslint-disable-next-line
  }, []);

  const onClick = async () => {
    await tags.map((tag) => {
      if (tag._id !== undefined) return addCount(tag._id);
    });
    await formD.append('headerPhoto', file);
    await formD.append('header', header);
    await formD.append('genre', genre);
    await formD.append('text', converter.makeHtml(mdText));
    const tg = JSON.stringify(tags);
    await formD.append('tags', tg);
    addPost(formD);
  };
  const onChange = (e) => {
    setHeader(e.target.value);
  };
  const handleSuccess = (e) => {
    setFile(e[0].src.file);
  };

  const tagChange = (newValue, actionMeta) => {
    setTags((arr) => [...arr, newValue[newValue.length - 1]]);
    if (actionMeta.action === 'create-option') {
      addTag({ tag: newValue[newValue.length - 1].value });
    }
  };

  const handleChangeSelectGenre = (e) => {
    setGenre(e.target.value);
  };

  return (
    <Fragment>
      <div
        id='add-story-modal'
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
                aria-label='Close'>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <label htmlFor='storyTitle1' className='input-group-text'>
                    Story's title
                  </label>
                </div>
                <input
                  type='text'
                  className='form-control'
                  id='storyTitle1'
                  aria-describedby='emailHelp'
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <label
                      className='input-group-text'
                      htmlFor='inputGroupSelect01'>
                      Genre
                    </label>
                  </div>
                  <select
                    className='custom-select'
                    id='inputGroupSelect01'
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
                <label htmlFor='tags'>Story's tags</label>
                <CreatableSelect
                  options={tag !== null && !tag.loading && tag.tags}
                  id='tags'
                  onChange={tagChange}
                  isMulti
                />
              </div>

              <div className='form-group'>
                <Files
                  multiple={false}
                  maxSize='2mb'
                  multipleMaxSize='10mb'
                  accept={['image/jpg', 'image/jpeg']}
                  onSuccess={(e) => handleSuccess(e)}>
                  {({ browseFiles, getDropZoneProps }) => {
                    return (
                      <div>
                        <label>Choose header image for your story</label>
                        <div
                          {...getDropZoneProps({
                            style: {
                              width: 600,
                              height: 100,
                              border: '2px lightgray dashed',
                            },
                          })}>
                          {file !== '' ? (
                            <div key={file.name} className='ml-2'>
                              {file.name}
                              <button
                                type='button'
                                className='btn btn-danger btn-sm ml-2'
                                onClick={() => setFile('')}>
                                Del
                              </button>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div>
                          Dragging not convenient? Click{' '}
                          <button onClick={browseFiles}>here</button> to select
                          files.
                        </div>
                      </div>
                    );
                  }}
                </Files>
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
                data-dismiss='modal'>
                Close
              </button>

              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
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
  tag: state.tags,
});

AddPostModal.propTypes = {
  addPost: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addCount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  addPost,
  uploadFile,
  getTags,
  addTag,
  addCount,
})(AddPostModal);
