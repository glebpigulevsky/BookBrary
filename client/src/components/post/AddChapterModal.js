import React, { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { addChapter } from '../../actions/postActions';
import ReactMde from 'react-mde';

import 'react-mde/lib/styles/css/react-mde-all.css';
import Showdown from 'showdown';

//Drop down package
import Files from 'react-butterfiles';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});
const formD = new FormData();

const AddChapterModal = ({ addChapter, post }) => {
  const [header, setHeader] = useState('');
  const [mdText, setmdText] = useState('');
  const [file, setFile] = useState('');
  const [selectedTab, setSelectedTab] = useState('write');

  const onClick = async () => {
    await formD.append('headerPhoto', file);
    await formD.append('header', header);

    await formD.append('text', converter.makeHtml(mdText));

    await addChapter(formD, post.post._id);
    setHeader('');
    setmdText('');
    setFile('');
    formD.delete('headerPhoto');
    formD.delete('header');
    formD.delete('text');
  };

  const handleSuccess = (e) => {
    setFile(e[0].src.file);
  };

  const onChange = (e) => {
    setHeader(e.target.value);
  };

  return (
    <Fragment>
      <div className='modal' tabIndex='-1' role='dialog' id='add-chapter-modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>
                <FormattedMessage
                  id='addStoryModal.header-text'
                  defaultMessage='Add story'
                  description='Header of adding story modal'
                />
              </h5>
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
                  <label htmlFor='chapterTitle' className='input-group-text'>
                    <FormattedMessage
                      id='addChapterModal.title-label'
                      defaultMessage='Chapter title'
                    />
                  </label>
                </div>
                <input
                  type='text'
                  value={header}
                  className='form-control'
                  id='chapterTitle'
                  aria-describedby='chapterTitle'
                  onChange={onChange}
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
                        <label>
                          <FormattedMessage
                            id='addStoryModal.imageTitle-text'
                            defaultMessage='Choose header image for your story'
                          />
                        </label>
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
                                <FormattedMessage
                                  id='addStoryModal.imageTitle-btn'
                                  defaultMessage='Del'
                                />
                              </button>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div>
                          <FormattedMessage
                            id='addStoryModal.notDrag-text'
                            defaultMessage='Dragging not convenient? Click'
                          />{' '}
                          <button onClick={browseFiles}>
                            <FormattedMessage
                              id='addStoryModal.hereFile-btn'
                              defaultMessage='here '
                            />
                          </button>
                          <FormattedMessage
                            id='addStoryModal.toSelect-text'
                            defaultMessage='to select'
                          />
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
                <FormattedMessage
                  id='addStoryModal.closeModal-btn'
                  defaultMessage='Close'
                />
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-dismiss='modal'
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

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addChapter })(AddChapterModal);
