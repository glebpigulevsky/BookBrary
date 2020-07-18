import React from 'react';
import { Container } from 'react-floating-action-button';

const AddBtn = () => {
  return (
    <Container>
      <div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'red',
          textAlign: 'center',
          paddingTop: '8px',
          paddingLeft: '2px',
          borderRadius: '32px',
        }}>
        <a
          href='#!'
          tooltip='Create note link'
          icon='far fa-sticky-note'
          data-target='#add-story-modal'
          data-toggle='modal'
          style={{ cursor: 'pointer', color: 'white' }}>
          <i className='far fa-sticky-note'></i>
        </a>
      </div>
    </Container>
  );
};

export default AddBtn;
