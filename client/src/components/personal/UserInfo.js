import React, { useState, useEffect, Fragment } from 'react';
import { getProfile, updateProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InlineEdit from '../../utils/react-edit-inline/index';
import { FormattedMessage } from 'react-intl';

const initialState = {
  location: '',
  bio: '',
  youtube: '',
  facebook: '',
  instagram: '',
};

export const UserInfo = ({
  getProfile,
  profile: { profile, loading },
  updateProfile,
}) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (!profile) getProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }

    //eslint-disable-next-line
  }, [loading, getProfile, profile]);

  const { location, bio, facebook, youtube, instagram } = formData;

  const onChange = (data) => {
    for (let key in data) {
      setFormData({ ...formData, [key]: data[key] });
      updateProfile({ ...formData, [key]: data[key] });
    }
  };

  return (
    <Fragment>
      <h4>
        {' '}
        <FormattedMessage
          id='userInfo.header-text'
          defaultMessage='Personal info'
          description='Header of personal col'
        />
      </h4>
      <ul className='list-group list-group-flush border-top border-primary mt-4'>
        <li className='list-group-item'>
          <FormattedMessage
            id='userInfo.location-text'
            defaultMessage='Location:'
            description='Header of location'
          />
          <div
            className='ml-1'
            style={{
              borderBottom: '1px dotted red',
              display: 'inline-block',
            }}>
            <InlineEdit
              activeClassName='editing'
              text={location}
              paramName='location'
              change={onChange}
              style={{
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0,
              }}
            />
          </div>
        </li>
        <li className='list-group-item'>
          <div
            className='pl-1'
            style={{
              borderLeft: '1px dotted red',
            }}>
            <InlineEdit
              activeClassName='editing'
              text={bio}
              paramName='bio'
              change={onChange}
              style={{
                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0,
              }}
            />
          </div>
        </li>
      </ul>
      <ul className='list-group mt-4'>
        <li className='list-group-item active'>
          <FormattedMessage
            id='userInfo.linksHeader-text'
            defaultMessage='Social Links'
            description='Header of Links'
          />
        </li>

        <li className='list-group-item'>
          <a href={youtube} className='mr-2'>
            <i className='fab fa-youtube'></i>
          </a>
          <div
            style={{
              borderBottom: '1px dotted red',
              display: 'inline-block',
            }}>
            <InlineEdit
              activeClassName='editing'
              text={youtube}
              paramName='youtube'
              change={onChange}
              style={{
                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0,
              }}
            />
          </div>
        </li>

        <li className='list-group-item'>
          <a href={facebook} className='mr-2'>
            <i className='fab fa-facebook'></i>
          </a>
          <div
            style={{
              borderBottom: '1px dotted red',
              display: 'inline-block',
            }}>
            <InlineEdit
              activeClassName='editing'
              text={facebook}
              paramName='facebook'
              change={onChange}
              style={{
                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0,
              }}
            />
          </div>
        </li>
        <li className='list-group-item'>
          <a href={instagram} className='mr-2'>
            <i className='fab fa-instagram'></i>
          </a>
          <div
            style={{
              borderBottom: '1px dotted red',
              display: 'inline-block',
            }}>
            <InlineEdit
              activeClassName='editing'
              text={instagram}
              paramName='instagram'
              change={onChange}
              style={{
                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0,
              }}
            />
          </div>
        </li>
      </ul>
    </Fragment>
  );
};

UserInfo.propTypes = {
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfile, updateProfile })(
  UserInfo
);
