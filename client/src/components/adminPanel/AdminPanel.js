import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAusers } from '../../actions/usersActions';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import { FormattedMessage } from 'react-intl';

const AdminPanel = (props) => {
  useEffect(() => {
    props.getAusers();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Fragment>
        {props.users.users !== null && !props.users.loading ? (
          <table className='table table-hover table-sm'>
            <thead>
              <tr>
                <th scope='col'>id</th>
                <th scope='col'>
                  Name
                  <FormattedMessage
                    id='adminPanel.name-tableheader'
                    defaultMessage='Name'
                  />
                </th>
                <th scope='col'>Email</th>
                <th scope='col'>
                  {' '}
                  <FormattedMessage
                    id='adminPanel.status-tableheader'
                    defaultMessage='Status'
                  />
                </th>
                <th scope='col'>
                  <FormattedMessage
                    id='adminPanel.admin-tableheader'
                    defaultMessage='Admin'
                  />
                </th>
                <th scope='col'>
                  <FormattedMessage
                    id='adminPanel.edit-tableheader'
                    defaultMessage='Edit'
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {props.users.users.map((user) => (
                <UserItem key={user._id} user={user} />
              ))}
            </tbody>
          </table>
        ) : (
          <Spinner />
        )}
      </Fragment>
    </div>
  );
};

AdminPanel.propTypes = {
  getAusers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, { getAusers })(AdminPanel);
