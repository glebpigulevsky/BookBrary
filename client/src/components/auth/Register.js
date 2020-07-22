import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import { createProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      props.setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      props.setAlert('Passwords doesnt match', 'danger');
    } else {
      props.setAlert('Please, verify your email', 'primary');
      await props.register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (props.isAuthenticated && !props.isBlocked) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container col-6'>
      <h3>
        <FormattedMessage
          id='register.header-text'
          defaultMessage='Account Register'
          description='Header of register'
        />
      </h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>
            <FormattedMessage
              id='register.nameField-text'
              defaultMessage='Name'
              description='field of nameof register'
            />
          </label>
          <input
            type='text'
            name='name'
            className='form-control'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>
            <FormattedMessage
              id='register.emailField-text'
              defaultMessage='Email Address'
              description='field of email of register'
            />
          </label>
          <input
            type='email'
            name='email'
            className='form-control'
            value={email}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>
            <FormattedMessage
              id='register.passwordField-text'
              defaultMessage='Password'
              description='field of password of register'
            />
          </label>
          <input
            type='password'
            name='password'
            className='form-control'
            value={password}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>
            <FormattedMessage
              id='register.confirmPasswordField-text'
              defaultMessage='Confirm password'
              description='field of confirm password of register'
            />
          </label>
          <input
            type='password'
            name='password2'
            className='form-control'
            value={password2}
            onChange={onChange}
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          <FormattedMessage
            id='register.registerField-btn'
            defaultMessage='Register'
            description='Btn register'
          />
        </button>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isBlocked: state.auth.isBlocked,
});

export default connect(mapStateToProps, { setAlert, register, createProfile })(
  Register
);
