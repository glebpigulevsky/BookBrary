import React from 'react';

import { FormattedMessage } from 'react-intl';

const About = () => {
  return (
    <div>
      <h1>
        <FormattedMessage
          id='about.header-text'
          defaultMessage='About this app'
          description='Header of about'
        />
      </h1>
      <p className='my-2'>
        <FormattedMessage
          id='about.body-text'
          defaultMessage='This is a full stack React app for keeping stories'
          description='body of about'
        />
      </p>
      <p>
        <strong className='bg-dark text-light p-1'>
          <FormattedMessage
            id='about.version-badge'
            defaultMessage='Version'
            description='version about'
          />
        </strong>{' '}
        0.0.1
      </p>
      <p>
        <strong className='bg-dark text-light p-1'>
          <FormattedMessage
            id='about.author-badge'
            defaultMessage='Author'
            description='author about'
          />
        </strong>{' '}
        CasperCarver
      </p>
    </div>
  );
};

export default About;
