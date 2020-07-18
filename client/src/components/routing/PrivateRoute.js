import React from 'react';
import {connect} from 'react-redux'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, auth, location, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={ props =>
        (!auth.isAuthenticated && !auth.loading && auth.isBlocked  ) ? (
          <Redirect to='/login' />
        ) : (
          (auth.isAdmin && (location.pathname === '/adminpanel')) 
          ? 
          ( <Redirect to='/' />)
          :
          ( <Component {...props} /> )
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);