import React from 'react';

const BodyStory = ({ text }) => {
  function createMarkup() {
    return { __html: text };
  }
  return <div dangerouslySetInnerHTML={createMarkup()} />;
};

export default BodyStory;
