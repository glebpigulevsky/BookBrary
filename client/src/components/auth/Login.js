import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { setAlert } from '../../actions/alertActions';

import { FormattedMessage } from 'react-intl';

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      props.login(email, password);
    }
  };

  // Redirect if logged in
  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container col-6'>
      <h3>
        <FormattedMessage
          id='login.header-text'
          defaultMessage='Account Login'
          description='Header of login'
        />
      </h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>
            <FormattedMessage
              id='login.emailField-text'
              defaultMessage='Email Address'
              description='field of email of login'
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
              id='login.passwordField-text'
              defaultMessage='Password'
              description='field of password of login'
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

        <button type='submit' className='btn btn-primary'>
          <FormattedMessage
            id='login.loginField-btn'
            defaultMessage='Login'
            description='Btn login'
          />
        </button>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert })(Login);
