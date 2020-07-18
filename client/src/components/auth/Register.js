import React,{ useState } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alertActions';
import { register } from '../../actions/authActions';
import PropTypes from 'prop-types'


const Register = (props) => {

  const[user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

 

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value});

  const onSubmit = async e => {
    e.preventDefault();
    if(name === '' || email === '' || password === '') {
      
      props.setAlert('Please enter all fields', 'danger')
    } else if (password !== password2) {
      props.setAlert('Passwords doesnt match', 'danger')
    } else {
      props.setAlert('Please, verify your email', 'primary')
      props.register({name, email, password});
    }
  }

  // Redirect if logged in
  if (props.isAuthenticated && !props.isBlocked) {
    return <Redirect to="/dashboard"/>
  }

  return (
    <div className="container col-6">
      <h3>Account Register</h3>
      <form onSubmit={onSubmit} >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" className="form-control" value={name} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" className="form-control" value={email} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" className="form-control" value={password} onChange={onChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm password</label>
          <input type="password" name="password2" className="form-control" value={password2} onChange={onChange}/>
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isBlocked: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isBlocked: state.auth.isBlocked
}) 

export default connect(mapStateToProps, {setAlert, register})(Register)
