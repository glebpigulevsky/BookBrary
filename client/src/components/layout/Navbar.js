import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';

const Navbar = ({
  auth: { isAuthenticated, loading, isAdmin, user },
  logout,
  clearProfile,
}) => {
  const onClick = () => {
    logout();
    clearProfile();
  };
  const adminLink = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link text-danger' to='/adminPanel'>
          Admin Panel
        </Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <ul className='navbar-nav mr-auto'>
        <li className='nav-item'>
          <Link className='nav-link ' to='/personal-page'>
            Personal Page
          </Link>
        </li>
        {isAdmin && adminLink}
      </ul>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg  navbar-dark bg-primary mb-5'>
      <Link to='/'>
        <i className='fas fa-book-reader text-light'></i>{' '}
        <span className='navbar-brand'> BookBrary</span>
      </Link>

      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          {!loading && (isAuthenticated ? authLinks : guestLinks)}

          <li className='nav-item'>
            <Link className='nav-link' to='/about'>
              About
            </Link>
          </li>
        </ul>

        {isAuthenticated && (
          <Fragment>
            <span className='navbar-text'>
              Hello, {user !== null && user.name}
            </span>
            <ul className='navbar-nav '>
              <li className='nav-item'>
                <a
                  onClick={onClick}
                  href='#!'
                  className='badge badge-danger ml-3 p-2'>
                  Logout
                </a>
              </li>
            </ul>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout, clearProfile })(Navbar);
