import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';
import { getPostsSearch } from '../../actions/postActions';
import AsyncSelect from 'react-select/async';

const Navbar = ({
  auth: { isAuthenticated, loading, isAdmin, user },
  logout,
  clearProfile,
  getPostsSearch,
  post,
}) => {
  const onClick = () => {
    logout();
    clearProfile();
  };

  useEffect(() => {
    setSPosts(post.searchingPost);
    getPostsSearch();
  }, []);

  const [sPosts, setSPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const filterPostByQuery = (inputValue: string) => {
    return sPosts.filter((i) =>
      i.text.toLowerCase().includes(inputValue.toLowerCase())
    );
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

  const loadOptions = async (inputValue, callback) => {
    console.log(sPosts);
    await callback(filterPostByQuery(inputValue));
  };

  const customStyles = {
    input: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200,
    }),
  };

  const searchHandlerClick = async () => {
    await getPostsSearch();
    setSPosts(post.searchingPost);
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue.replace(/\W/g, ''));

    return inputValue;
  };

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
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptions}
              styles={customStyles}
              onInputChange={handleInputChange}
              onFocus={searchHandlerClick}
            />
            <span className='navbar-text ml-2'>
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
  getPostsSearch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  logout,
  clearProfile,
  getPostsSearch,
})(Navbar);
